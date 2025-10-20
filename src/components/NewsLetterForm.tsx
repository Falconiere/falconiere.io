import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const schema = z.object({
  email: z.string().email(),
  name: z.string().min(3),
});

type FormData = z.infer<typeof schema>;

type StatusMessage = {
  type: 'success' | 'error';
  message: string;
} | null;

export default function NewsLetterForm({ formApiUrl }: { formApiUrl: string }) {
  const [statusMessage, setStatusMessage] = useState<StatusMessage>(null);
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      name: '',
    },
  });
  const onSubmit = async (data: FormData) => {
    try {
      setStatusMessage(null);
      const payload = {
        email: data.email,
        name: data.name,
      };
      const response = await fetch(formApiUrl, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        form.reset();
        setStatusMessage({
          type: 'success',
          message:
            'Successfully subscribed! Check your email for confirmation.',
        });
      } else {
        setStatusMessage({
          type: 'error',
          message: 'Something went wrong. Please try again later.',
        });
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      setStatusMessage({
        type: 'error',
        message: 'Something went wrong. Please try again later.',
      });
    }
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;
  return (
    <form
      className="p-4 md:p-8 rounded-lg border dark:bg-slate-900 text-center flex flex-col gap-2"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div>
        <h3 className="m-0 text-foreground text-xl md:text-2xl">
          Join the Newsletter
        </h3>
        <p className="text-gray-500 dark:text-gray-400 text-[0.8em] md:text-xl">
          Subscribe to get my latest content by email.
        </p>
        {statusMessage && (
          <p
            className={`flex pb-2 ${statusMessage.type === 'success' ? 'text-green-500' : 'text-red-500'}`}
          >
            {statusMessage.message}
          </p>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <Input aria-label="Name" placeholder="Name" {...register('name')} />
        {errors.name && (
          <p className="text-red-500 flex pb-2">{errors.name.message}</p>
        )}
        <Input
          aria-label="Email Address"
          placeholder="Email Address"
          {...register('email')}
        />
        {errors.email && (
          <p className="text-red-500 flex pb-2">{errors.email.message}</p>
        )}
      </div>
      <Button
        type="submit"
        disabled={
          statusMessage?.type === 'success' || form.formState.isSubmitting
        }
      >
        {form.formState.isSubmitting ? 'Subscribing...' : 'Subscribe'}
      </Button>
      <div className="text-center pt-4 text-sm text-gray-500 dark:text-gray-400">
        We won&apos;t send you spam. Unsubscribe at any time.
      </div>
    </form>
  );
}

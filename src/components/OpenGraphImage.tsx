type OpenGraphImageProps = {
  title: string;
  description?: string;
  image?: string;
}

export const OpenGraphImage = ({ title, description, image }:OpenGraphImageProps) => (
<div style={{ display:"flex", width: 1200, height: 630, background: "white", color: "black", padding: "1rem", fontFamily: "OpenSansMedium" }}>
  <div>
    <h1>{title}</h1>
    {description && <p>{description}</p>}
  </div>
</div>)

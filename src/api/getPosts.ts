
const token = import.meta.env.GITHUB_TOKEN;
const path = "https://api.github.com/repos/Falconiere/my-notes/contents/projects/falconiere.io/blog/draft?ref=main";
export const getPosts = async () => {
  const response = await fetch(path, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json"
    }  
  });
  const data = await response.json();
  return data;
}
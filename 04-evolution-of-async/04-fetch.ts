const ac = new AbortController();

async function runA() {
  const response = await fetch(
    "https://api.github.com/users/doingandlearning/repos",
    { signal: ac.signal }
  );
  const data = await response.json();
  console.log("User object");
  console.log(data);
  ac.abort();
}
async function runB() {
  const response = await fetch(
    "https://api.github.com/users/doingandlearning/followers",
    { signal: ac.signal }
  );
  const data = await response.json();
  console.log("Repos");
  console.log(data);
  ac.abort();
}
async function runC() {
  const response = await fetch(
    "https://api.github.com/users/doingandlearning/orgs",
    { signal: ac.signal }
  );
  const data = await response.json();
  console.log("Orgs");
  console.log(data);
  ac.abort();
}

runA();
runB();
// runC();

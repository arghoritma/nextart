import { exec } from "child_process";

(async function resetGitRoot() {
  exec(
    "git remote remove origin",
    { cwd: process.cwd() },
    (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.error(`Stderr: ${stderr}`);
        return;
      }
      console.log(`Stdout: ${stdout}`);
    }
  );
})();

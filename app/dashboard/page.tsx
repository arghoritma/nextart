import { getFiles } from "@/actions/files";
import UploadForm from "@/components/UploadForm";

export default async function Page() {
  const { data: files } = await getFiles();

  return (
    <div className="min-h-screen bg-base-200 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="card bg-base-100 shadow-xl p-6">
          <h1 className="text-3xl font-bold mb-4">File Management</h1>
          <UploadForm />
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>File Name</th>
                  <th>Upload Date</th>
                  <th>File URL</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {files?.map((file) => (
                  <tr key={file.id}>
                    <td>{file.file_name}</td>
                    <td>{new Date(file.uploaded_at).toLocaleDateString()}</td>
                    <td>
                      <a
                        href={file.file_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link link-primary"
                      >
                        View File
                      </a>
                    </td>
                    <td>
                      <button className="btn btn-sm btn-error">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import type { IJobData } from "./ManageJobsPage";
import { Button } from "@/components/ui/button";

interface JobDetailDialogProps {
  job: IJobData | null;
  open: boolean;
  onClose: () => void;
}

const JobDetailDialog = ({ job, open, onClose }: JobDetailDialogProps) => {
  if (!job) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-full min-h-[90%] min-w-[90%] p-6">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Job Details</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col md:flex-row gap-6 mt-4">
          {/* Left: Images */}
          <div className=" w-[50%] flex flex-col gap-2">
            {job.image && job.image.length > 0 ? (
              <div className="flex flex-col gap-2">
                {job.image.map((img: string, idx: number) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`job-${idx}`}
                    className="w-full min-h-full object-cover rounded shadow"
                  />
                ))}
              </div>
            ) : (
              <div className="w-full h-48 bg-gray-100 flex items-center justify-center rounded shadow">
                No Image
              </div>
            )}
          </div>

          {/* Right: Job Info */}
          <div className=" flex flex-col gap-3 w-[50%]">
            <h3 className="text-lg font-semibold">{job.title}</h3>
            <p className="text-gray-700">{job.description}</p>

            <div className="grid grid-cols-2 gap-4 mt-2">
              <p>
                <strong>Location:</strong> {job.location}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                <span
                  className={`px-2 py-1 rounded text-sm font-medium ${
                    job.isComplete
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {job.isComplete ? "Completed" : "In Progress"}
                </span>
              </p>
              <p>
                <strong>Price:</strong> ${job.price}
              </p>
              <p>
                <strong>Timeline:</strong> {job.timeline || "N/A"}
              </p>
            </div>

            {/* Customer Info */}
            <div className="mt-4 p-4 bg-gray-50 rounded shadow-sm">
              <h4 className="font-semibold mb-2">Customer Info</h4>
              <div className="flex items-center gap-4">
                {job.customer?.profile_image && (
                  <img
                    src={job.customer.profile_image}
                    alt={job.customer.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                )}
                <div className="flex flex-col gap-1">
                  <p>
                    <strong>Name:</strong> {job.customer?.name || "N/A"}
                  </p>
                  <p>
                    <strong>Email:</strong> {job.customer?.email || "N/A"}
                  </p>
                  <p>
                    <strong>Verification:</strong>{" "}
                    {job.customer?.verification || "N/A"}
                  </p>
                </div>
              </div>
            </div>

            {/* Skills Needed */}
            {job.skills_needed && job.skills_needed.length > 0 && (
              <div className="mt-4">
                <strong>Skills Needed:</strong>{" "}
                <span className="text-gray-700">{job.skills_needed.join(", ")}</span>
              </div>
            )}
          </div>
        </div>

        <DialogClose className="flex justify-end items-end">
          <Button >
              Close
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default JobDetailDialog;

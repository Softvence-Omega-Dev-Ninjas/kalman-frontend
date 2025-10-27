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
      <DialogContent className="w-full max-w-3xl max-h-[90vh] p-4 md:p-6 rounded-xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-lg md:text-xl font-bold text-center md:text-left">
            Job Details
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col  gap-4 md:gap-6 mt-4">
          {/* Left: Images */}
          <div className="w-full md:w-1/2 flex flex-col gap-2">
            {job.image && job.image.length > 0 ? (
              <div className="flex flex-col gap-2 max-h-64 md:max-h-[400px] overflow-y-auto rounded-md">
                {job.image.map((img: string, idx: number) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`job-${idx}`}
                    className="w-full h-28 md:h-36 object-cover rounded shadow-sm"
                  />
                ))}
              </div>
            ) : (
              <div className="w-full h-40 md:h-48 bg-gray-100 flex items-center justify-center rounded shadow-sm text-gray-400">
                No Image
              </div>
            )}
          </div>

          {/* Right: Job Info */}
          <div className="w-full  flex flex-col gap-2 md:gap-3 text-sm md:text-base">
            <h3 className="text-base md:text-lg font-semibold">{job.title}</h3>
            <p className="text-gray-700">{job.description}</p>

            <div className="grid grid-cols-2 gap-2 mt-2">
              <p>
                <strong>Location:</strong> {job.location}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                <span
                  className={`px-2 py-1 rounded text-xs md:text-sm font-medium ${
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
            <div className="mt-3 p-3 bg-gray-50 rounded shadow-sm text-sm md:text-base">
              <h4 className="font-semibold mb-2">Customer Info</h4>
              <div className="flex flex-col md:flex-row items-start md:items-center gap-3">
                {job.customer?.profile_image && (
                  <img
                    src={job.customer.profile_image}
                    alt={job.customer.name}
                    className="w-12 h-12 md:w-16 md:h-16 rounded-full object-cover"
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
              <div className="mt-2 text-sm md:text-base">
                <strong>Skills Needed:</strong>{" "}
                <span className="text-gray-700">{job.skills_needed.join(", ")}</span>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end mt-4">
          <DialogClose asChild>
            <Button size="sm" className="bg-[#FF7346] text-white hover:bg-[#e66534]">
              Close
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default JobDetailDialog;

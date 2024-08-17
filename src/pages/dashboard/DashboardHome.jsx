import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { format } from "date-fns";

export default function DashboardHome() {
  const { data: AllImages } = useQuery({
    queryKey: ["images"],
    queryFn: async () => {
      const response = await axios("http://localhost:3000/api/images");
      return response.data;
    },
  });

  return (
    <main className="my-12">
      <section>
        <div className="container">
          <h2 className="text-2xl font-medium text-center mb-4">
            Images Gallery
          </h2>

          {AllImages?.map((images) => (
            <div key={images?._id} className="mb-6 bg-gray-100 p-6 rounded-lg">
              <h4 className="md:text-xl font-medium mb-1">
                {images?.name} ({images?.email})
              </h4>
              <p className="text-sm mb-6">
                {format(images?.time, "dd MMM, yyyy :: HH:MM aa")}
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {images?.images?.map((image) => (
                  <img
                    key={image}
                    src={image}
                    alt="Photo"
                    className="rounded-md"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

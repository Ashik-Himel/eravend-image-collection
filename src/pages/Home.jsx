import axios from "axios";
import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

export default function Home() {
  const [files, setFiles] = useState(null);
  const [captchaValue, setCaptchaValue] = useState(null);

  const handleFilesChange = (e) => {
    setFiles(e.target.files);
  };
  const handleCaptchaChange = (value) => {
    setCaptchaValue(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!captchaValue) {
      alert("Please complete the CAPTCHA.");
      return;
    }

    if (!files || files.length === 0) {
      alert("Please select files to upload.");
      return;
    }

    const maxFiles = 120;
    if (files.length > maxFiles) {
      alert(`You can only upload up to ${maxFiles} files.`);
      return;
    }

    const formData = new FormData();
    formData.append("name", e.target.name.value);
    formData.append("email", e.target.email.value);
    formData.append("captchaValue", captchaValue);
    for (let i = 0; i < files.length; i++) {
      formData.append("images", files[i]);
    }

    axios
      .post("http://localhost:3000/api/images", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response.data);
        alert("Files uploaded successfully!");
      })
      .catch((error) => {
        console.error(error);
        alert("Error uploading files. Please try again later.");
      });
  };

  return (
    <main className="my-12">
      <section>
        <div className="container">
          <form
            className="w-full max-w-[600px] mx-auto border border-gray-300 rounded-lg bg-gray-50 p-6"
            onSubmit={handleSubmit}
          >
            <h2 className="text-2xl font-medium text-center mb-4">
              Upload Images
            </h2>
            <label className="block font-medium mb-2" htmlFor="name">
              Name
            </label>
            <input
              className="input w-full border border-gray-300 mb-4"
              type="text"
              name="name"
              id="name"
              placeholder="Enter your name"
              required
            />

            <label className="block font-medium mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="input w-full border border-gray-300 mb-4"
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
              required
            />

            <label className="block font-medium mb-2" htmlFor="images">
              Images <small>(Max 120 images)</small>
            </label>
            <input
              className="file-input w-full border border-gray-300 mb-4"
              onChange={handleFilesChange}
              type="file"
              name="images"
              id="images"
              accept="image/*"
              multiple
              required
            />

            <ReCAPTCHA
              sitekey="6Lf8vCgqAAAAAFrs5YnpmjF0HC5Qc6jaEWEk_HMh"
              onChange={handleCaptchaChange}
              className="mb-4"
            />

            <div className="text-center">
              <input type="submit" value="Upload" className="btn btn-primary" />
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}

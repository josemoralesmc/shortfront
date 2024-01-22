import NavBar from "../NavBar/NavBar";
import { useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [showWarning, setShowWarning] = useState(false);
  const [showWarningUrl, setShowWarningUrl] = useState(false);
  const [loading, setLoading] = useState(Boolean);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e: any) => {
    const value = e.target.value;
    setUrl(value);
    if (url.length > 0) {
      setShowWarningUrl(false)
    }

    setShowWarning(!value.startsWith("https://"));
  };

  
  const handleGenerateUrl = async () => {
    try {
      if (url.length < 1) {
        return setShowWarningUrl(true);
      }
      setLoading(true);
      const token = Cookies.get("Token");

      const response = await fetch("https://shorturl-qavg.onrender.com/create", {
        method: "POST",
        credentials: 'include',
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          full_url: url,
          short_url: shortUrl,
        }),
      });

      const data = await response.json();
      console.log(data);
      

      if (data.success == true) {
        setLoading(false);
         navigate('/myurls')
      } else {
        setError('Error generating URL');
      }
    } catch (error) {
      console.error("Error al realizar la solicitud:", error);
    }
  };
 

  return (
    <>
      <NavBar></NavBar>
      <div className="mx-5 mt-10">
        <label
          htmlFor="Url"
          className="block text-sm font-medium leading-6 text-gray-200"
        >
          Enter the URL here:
        </label>
        
        <input
          id="Url"
          name="Url"
          value={url}
          onChange={handleChange}
          className="border-2 block h-12 w-full rounded-md border border-double border-slate-800 border-transparent bg-[linear-gradient(#000,#000),linear-gradient(to_right,#334454,#334454)] bg-origin-border px-3 py-2 text-slate-200 transition-all duration-500 [background-clip:padding-box,_border-box] placeholder:text-slate-500 focus:bg-[linear-gradient(#000,#000),linear-gradient(to_right,#c7d2fe,#8678f9)] focus:outline-none focus:border-violet-500"
          placeholder="https://"
        />
        {showWarningUrl && (
          <p className="text-red-500 text-sm mt-2">
            Enter a URL please
          </p>
        )}
        {showWarning && (
          <p className="text-red-500 text-sm mt-2">
            Please start with "https://"
          </p>
        )}

        <label
          htmlFor="ShortUrl"
          className="block text-sm font-medium leading-6 text-gray-200 mt-5"
        >
          Custom short URL:
        </label>
        <input
          id="ShortUrl"
          name="ShortUrl"
          value={shortUrl}
          onChange={(e) => setShortUrl(e.target.value)}
          className="border-2 block h-12 w-full rounded-md border border-double border-slate-800 border-transparent bg-[linear-gradient(#000,#000),linear-gradient(to_right,#334454,#334454)] bg-origin-border px-3 py-2 text-slate-200 transition-all duration-500 [background-clip:padding-box,_border-box] placeholder:text-slate-500 focus:bg-[linear-gradient(#000,#000),linear-gradient(to_right,#c7d2fe,#8678f9)] focus:outline-none focus:border-violet-500"
          placeholder="If it is empty, the url is random"
        />
        {loading ? (
          <span className="relative inline-block overflow-hidden rounded-full p-[1px] mt-10">
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
            <div className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950/90 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
              <svg
                className="animate-spin h-5 w-5 mr-3 ..."
                viewBox="0 0 24 24"
              ></svg>
              Processing...
            </div>
          </span>
        ) : (
          <span className="relative inline-block overflow-hidden rounded-full p-[1px] mt-10">
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
            <div
              onClick={handleGenerateUrl}
              className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950/90 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl"
            >
              Generate Url
            </div>
          </span>
        )}
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
    </>
  );
};

export default Create;

import { useEffect, useState } from "react";
import { apiGet } from "../lib/api";
import { defaultSiteSettings, mergeSiteSettings } from "../lib/siteSettings";

function useSiteSettings() {
  const [siteSettings, setSiteSettings] = useState(defaultSiteSettings);

  useEffect(() => {
    let isMounted = true;

    apiGet("/settings")
      .then((response) => {
        if (!isMounted) return;
        setSiteSettings(mergeSiteSettings(response.data));
      })
      .catch((error) => {
        console.error("Unable to load site settings:", error);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return siteSettings;
}

export default useSiteSettings;

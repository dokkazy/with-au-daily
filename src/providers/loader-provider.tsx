"use client";

import { useEffect } from "react";
import { useLoadingStore } from "@/store/loading-store";

const PageLoader = () => {
  const { setLoading } = useLoadingStore();

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => setLoading(false), 1000); // Loading ít nhất 1s
    return () => clearTimeout(timeout);
  }, []);

  return null;
};

export default PageLoader;
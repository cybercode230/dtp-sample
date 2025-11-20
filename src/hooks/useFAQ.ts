import { useState, useEffect, useCallback } from "react";
import api from "../api/axios";

export interface FAQ {
  id: number;
  question: string;
  answer: string;
  category?: string;
  created_by?: number;
}

export const useFAQ = () => {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [searchResults, setSearchResults] = useState<FAQ[]>([]);
  const [recommended, setRecommended] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch all FAQs
  const fetchFAQs = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get("/faqs");
      setFaqs(res.data.data);
      setRecommended(res.data.data.slice(0, 5)); // first 5 as recommended
    } catch (err: any) {
      setError(err.message || "Failed to fetch FAQs");
    } finally {
      setLoading(false);
    }
  }, []);

  // Search FAQs by keyword
  const searchFAQs = useCallback(async (keyword: string) => {
    if (!keyword) {
      setSearchResults([]);
      return;
    }
    try {
      const res = await api.get(`/faqs/search?keyword=${encodeURIComponent(keyword)}`);
      setSearchResults(res.data.data);
    } catch (err: any) {
      setError(err.message || "Search failed");
    }
  }, []);

  // Get answers for a specific question
  const getFAQById = useCallback(async (id: number) => {
    try {
      const res = await api.get(`/faqs/${id}`);
      return res.data.data as FAQ;
    } catch (err: any) {
      setError(err.message || "Failed to fetch FAQ");
      return null;
    }
  }, []);

  // Optionally: submit a question (read-only for now)
  const submitQuestion = useCallback(async (question: string) => {
    try {
      const res = await api.post("/faqs", { question, answer: "" }); // placeholder answer
      return res.data.data as FAQ;
    } catch (err: any) {
      setError(err.message || "Failed to submit question");
      return null;
    }
  }, []);

  useEffect(() => {
    fetchFAQs();
  }, [fetchFAQs]);

  return {
    faqs,
    searchResults,
    recommended,
    loading,
    error,
    fetchFAQs,
    searchFAQs,
    getFAQById,
    submitQuestion,
  };
};

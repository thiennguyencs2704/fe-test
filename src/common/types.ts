export interface Job {
  id: number;
  contactId: number;
  start: string;
  end: string;
  location: string;
  name: string;
}

export interface IDataService {
  getJobs: () => Promise<
    Pick<Job, "id" | "name" | "start" | "end" | "contactId">[]
  >;
  getJobsWithSearchTerm: (
    searchTerm: string
  ) => Promise<Pick<Job, "id" | "name" | "start" | "end" | "contactId">[]>;
}

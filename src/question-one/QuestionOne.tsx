import React, { useEffect, useState } from "react";
import { IDataService, Job } from "../common/types";
import { SectionGroup } from "../components/section/SectionGroup";
import SectionJobList from "../components/section/SectionJobList";
import { SectionPanel } from "../components/section/SectionPanel";
import { DataService } from "../service/DataService";

import "./QuestionOne.css";

export type FilteredJob = Omit<Job, "location"> | undefined;

export const QuestionOne: React.FC<{ service: IDataService }> = () => {
  const [jobData, setJobData] = useState<FilteredJob[]>([]);
  const [jobQuery, setJobQuery] = useState<string>("");

  const handleOnChange = (event: React.FormEvent<HTMLInputElement>) => {
    setJobQuery(event.currentTarget.value);
  };

  const handleGetAllJobs = async () => {
    const res: FilteredJob[] = await DataService.getJobs();
    setJobData(res);
  };

  useEffect(() => {
    if (!jobQuery) {
      setJobData([]);
      return;
    }

    let timer: ReturnType<typeof setTimeout>;
    if (jobQuery.length > 2) {
      timer = setTimeout(async () => {
        const res: FilteredJob[] = await DataService.getJobsWithSearchTerm(
          jobQuery
        );
        setJobData(res);
      }, 300);
    }

    return () => clearTimeout(timer);
  }, [jobQuery]);

  return (
    <SectionGroup>
      <SectionPanel>
        <SectionJobList
          jobData={jobData}
          handleOnChange={handleOnChange}
          handleGetAllJobs={handleGetAllJobs}
        />
      </SectionPanel>
    </SectionGroup>
  );
};

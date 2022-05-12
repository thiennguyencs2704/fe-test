import React from "react";
import { formatDate } from "../../helpers/formatDate";
import { FilteredJob } from "../../question-one/QuestionOne";

interface ISectionJobListProps {
  jobData: FilteredJob[];
  handleOnChange(event: React.FormEvent<HTMLInputElement>): void;
  handleGetAllJobs(): void;
}

const SectionJobList = (props: ISectionJobListProps) => {
  return (
    <div className="container">
      <div className="searchWrapper">
        <label htmlFor="searchBar">Search</label>
        <input
          id="searchBar"
          type="text"
          placeholder="Search..."
          onChange={props.handleOnChange}
        />
      </div>
      <button onClick={props.handleGetAllJobs}>Show all jobs</button>
      <div>
        <ul>
          <table>
            <tbody>
              <tr>
                <th>Job Name</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Contact ID</th>
              </tr>
              {props.jobData.map((job: FilteredJob) => (
                <tr key={job?.id}>
                  <td>{job?.name}</td>
                  <td>{formatDate(job?.start || "")}</td>
                  <td>{formatDate(job?.end || "")}</td>
                  <td>{job?.contactId}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </ul>
      </div>
    </div>
  );
};

export default SectionJobList;

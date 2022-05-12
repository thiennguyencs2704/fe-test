import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import App from "./App";
import { QuestionOne } from "./question-one/QuestionOne";
import { IDataService, Job } from "./common/types";
import data from "./service/db.json";

const { jobs } = data as { jobs: Job[] };

const service: IDataService = {
  getJobsWithSearchTerm: (searchTerm: string) => {
    return Promise.resolve(
      jobs.filter(({ name }) => name.toLowerCase().includes(searchTerm))
    );
  },
  getJobs: () => {
    return Promise.resolve(jobs);
  },
};

describe("Skedulo tech test", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test("renders app", () => {
    render(<App />);
  });

  test("can search for data", async () => {
    const { getByLabelText } = render(<QuestionOne service={service} />);
    const input = getByLabelText("Search");
    fireEvent.change(input, { target: { value: "build" } });

    await waitFor(async () => {
      expect(
        screen.getByText((node) => node.includes("Build a fence"))
      ).toBeInTheDocument();
      expect(
        screen.getByText((node) => node.includes("Build a shed"))
      ).toBeInTheDocument();
    });
  });

  test("only searches when more than 3 characters", async () => {
    const spyService = {
      getJobsWithSearchTerm: jest.fn(service.getJobsWithSearchTerm),
      getJobs: jest.fn(service.getJobs),
    };

    const { getByLabelText } = render(<QuestionOne service={spyService} />);
    const input = getByLabelText("Search");
    fireEvent.change(input, { target: { value: "bu" } });

    jest.advanceTimersByTime(1000);
    const build = screen.queryByText((node) => node.includes("Build"));
    expect(build).not.toBeInTheDocument();
    expect(spyService.getJobsWithSearchTerm).not.toHaveBeenCalled();
    expect(spyService.getJobs).not.toHaveBeenCalled();
  });

  test("clears results when input clears", async () => {
    const { getByLabelText } = render(<QuestionOne service={service} />);
    const input = getByLabelText("Search");
    fireEvent.change(input, { target: { value: "build" } });

    await waitFor(async () => {
      expect(
        screen.getByText((node) => node.includes("Build a fence"))
      ).toBeInTheDocument();
      expect(
        screen.getByText((node) => node.includes("Build a shed"))
      ).toBeInTheDocument();
    });

    fireEvent.change(input, { target: { value: "" } });
    await waitFor(async () => {
      expect(
        screen.queryByText((node) => node.includes("Build a fence"))
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText((node) => node.includes("Build a shed"))
      ).not.toBeInTheDocument();
    });
  });
});

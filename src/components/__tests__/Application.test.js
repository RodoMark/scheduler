import React from "react";

import { prettyDOM, render, cleanup, waitForElement, fireEvent, getByText } from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);

describe("Application", () => {

  it("defaults to Monday and changes the schedule when a new day is selected", async () => {
    const {getByText} = render(<Application />);
    
    await waitForElement(() => getByText("Monday"));
      fireEvent.click(getByText("Tuesday"));
      expect(getByText('Leopold Silvers')).toBeInTheDocument();
      
  
  });

  it("loads data, books an interview and reduces the spots remaining for Monday by 1", () => {
    const { container } = render(<Application />);

    await waitForElement(()=> getByText("Archie Cohen"))
    console.log(prettyDOM(container));
  });


  
})



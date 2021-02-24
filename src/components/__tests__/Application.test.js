import React from "react";
import axios from "axios"

import { prettyDOM, render, cleanup, waitForElement, fireEvent, queryByText, queryByAltText, getByText, getAllByTestId, getByAltText, getByPlaceholderText } from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);

describe("Application", () => {

 

  it("defaults to Monday and changes the schedule when a new day is selected", async () => {
    
    const {getByText} = render(<Application />);
    
    await waitForElement(() => getByText("Monday"));
      fireEvent.click(getByText("Tuesday"));
      expect(getByText('Leopold Silvers')).toBeInTheDocument();
      
  
  });

  it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
    const { container, debug } = render(<Application/>);
    
    await waitForElement(()=> getByText(container, "Archie Cohen"))

    const appointment = getAllByTestId(container, "appointment")[0];

    fireEvent.click(getByAltText(appointment, "Add"));

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
    target: { value: "Lydia Miller-Jones" }
    });

    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    fireEvent.click(getByText(appointment, "Save"));
    expect(getByText(appointment, 'SAVING')).toBeInTheDocument();

    await waitForElement(() => queryByText(appointment, "Lydia Miller-Jones"));

    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );

    // waitForElement(()=> expect(getByText(day, "no spots remaining")).toBeInTheDocument())
    
  });

  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    const { container, debug } = render(<Application />);

    await waitForElement(()=> getByText(container, "Archie Cohen"))

    const appointment = getAllByTestId(container, "appointment").find(appointment => queryByText(appointment, "Archie Cohen"));

    fireEvent.click(queryByAltText(appointment, "Delete"));
    expect(getByText(appointment, "Are you sure you would like to delete?")).toBeInTheDocument();

    fireEvent.click(queryByText(appointment, "Confirm"));
    expect(getByText(appointment, 'DELETING')).toBeInTheDocument();

    await waitForElement(() => queryByAltText(appointment, "Add"));

    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );

    // expect(getByText(day, "2 spots remaining")).toBeInTheDocument();

  });

  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async() => {

    const { container, debug } = render(<Application />);

    await waitForElement(()=> getByText(container, "Archie Cohen"))

    const appointment = getAllByTestId(container, "appointment").find(appointment => queryByText(appointment, "Archie Cohen"));

    fireEvent.click(getByAltText(appointment, "Edit"));

    fireEvent.change(getByPlaceholderText(appointment, "Enter Student Name"), {
      target: { value: "Lydia Miller-Jones" }
      });

      fireEvent.click(getByAltText(appointment, "Tori Malcolm"));

      fireEvent.click(getByText(appointment, "Save"));
      // expect(getByText(appointment, 'SAVING')).toBeInTheDocument();
  
      // await waitForElement(() => queryByText(appointment, "Lydia Miller-Jones"));
  

    console.log(prettyDOM(appointment))

    // fireEvent.click(getByText(appointment, "Save"));

    // expect(getByText(appointment, "SAVING")).toBeInTheDocument();

    // const day = getAllByTestId(container, "day").find(day =>
    //   queryByText(day, "Monday")
    // );

    // expect(getByText(day, "1 spot remaining")).toBeInTheDocument();


  })

  it.only("shows the save error when failing to save an appointment", async () => {
    axios.put.mockRejectedValueOnce();

    const { container, debug } = render(<Application />);

    await waitForElement(()=> getByText(container, "Archie Cohen"))

    const appointment = getAllByTestId(container, "appointment")[0]

    // console.log(prettyDOM(appointment))

    fireEvent.click(queryByAltText(appointment, "Add"));
    expect(getByPlaceholderText(appointment, "Enter Student Name")).toBeInTheDocument();

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
      });
  
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    fireEvent.click(queryByText(appointment, "Save"));
    expect(getByText(appointment, 'SAVING')).toBeInTheDocument();


    await waitForElement(() => getByText(appointment, 'Error'));

    fireEvent.click(queryByAltText(container, "Close"))

    expect(appointment).toBeInTheDocument();
  });

  it("shows the delete error when failing to save an appointment", async () => {
    axios.delete.mockRejectedValueOnce();
    const { container, debug } = render(<Application />);

    await waitForElement(()=> getByText(container, "Archie Cohen"))

    const appointment = getAllByTestId(container, "appointment").find(appointment => queryByText(appointment, "Archie Cohen"));

    fireEvent.click(queryByAltText(appointment, "Delete"));
    expect(getByText(appointment, "Are you sure you would like to delete?")).toBeInTheDocument();

    console.log(prettyDOM(queryByText(appointment, "Confirm")))

    fireEvent.click(queryByText(appointment, "Confirm"));
    expect(getByText(appointment, 'DELETING')).toBeInTheDocument();


    await waitForElement(() => getByText(appointment, 'Error'));

    fireEvent.click(queryByAltText(container, "Close"))

    expect(appointment).toBeInTheDocument();
    
  });
})



import React from "react";
import ReactDOM from "react-dom";
import { render, screen, fireEvent } from '@testing-library/react';
import "@testing-library/dom";
import "@testing-library/jest-dom";
import App from "./App";
import Header from "./Header";

it(
  "renders without crashing",
  () => {
    const div = document.createElement("div");
    ReactDOM.render(<App />, div);
  }
);

test(
  'Header should display',
  () => {
    render(<Header />);
    expect(screen.getByRole('banner'))
      .toBeInTheDocument;
  }
);

test(
  'emoji list should load',
  () => {
    render(<App />);
    expect(screen.getAllByText('Click to copy emoji').length)
      .toBe(20);
  }
);

test(
  'the searched emoji should filter',
  () => {
    render(<App />);
    fireEvent.change(
      screen.getByRole('textbox'),
      { target: { value: 'Dragon Face' } }
    );
    expect(screen.getAllByText(/Dragon Face/i).length)
      .toBe(1);
  }
);

test(
  'click event should copy',
  () => {
    render(<App />);
    expect(screen.getByText('100').parentElement.getAttribute("data-clipboard-text"))
      .toMatch("💯");
  }
);

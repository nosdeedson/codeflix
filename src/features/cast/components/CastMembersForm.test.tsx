import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { CastMembersForm } from './CastMembersForm';


const Props = {
  castMember: {
    id: "1",
    name: "Teste",
    type: 1,
    deleted_at: null,
    created_at: "2021-10-01T00:00:00.000000Z",
    updated_at: "2021-10-01T00:00:00.000000Z",
  },
  isdisabled: false,
  isLoading: false,
  handleSubmit: jest.fn(),
  handleChange: jest.fn(),
  handleTypeChange: jest.fn(),
};

const makeProps = (type = 1) => ({
  castMember: {
    id: "1",
    name: "Teste",
    type,
    deleted_at: null,
    created_at: "2021-10-01T00:00:00.000000Z",
    updated_at: "2021-10-01T00:00:00.000000Z",
  },
  isdisabled: false,
  isLoading: false,
  handleSubmit: jest.fn(),
  handleChange: jest.fn(),
  handleTypeChange: jest.fn(),
});


describe("CastMembersForm", () => {


  it("should render castMember form  correctly", () => {
    const { asFragment } = render(<CastMembersForm {...Props} />, {
      wrapper: BrowserRouter,
    });

    expect(asFragment()).toMatchSnapshot();
  });

  it("should render castMember form with loading state", () => {
    const { asFragment } = render(<CastMembersForm {...Props} isLoading />, {
      wrapper: BrowserRouter,
    });

    expect(asFragment()).toMatchSnapshot();
  });

  it("should render castMember using type equal to 1", () => {
    render(<CastMembersForm {...makeProps(1)} />
      , { wrapper: BrowserRouter 

      });

    const directorRadio = screen.getByLabelText("Director") as HTMLInputElement;
    const actorRadion = screen.getByLabelText("Actor") as HTMLInputElement;
    expect(actorRadion.checked).toBe(false);
    expect(directorRadio.checked).toBe(true);
  });

  it("should render castMember using type equal to 2", () => {
    render(<CastMembersForm {...makeProps(2)} />
      , { wrapper: BrowserRouter });

    const directorRadio = screen.getByLabelText("Director") as HTMLInputElement;
    const actorRadion = screen.getByLabelText("Actor") as HTMLInputElement;
    expect(actorRadion.checked).toBe(true);
    expect(directorRadio.checked).toBe(false);
  });

    it("should render castMember using type undefined", () => {
    render(<CastMembersForm {...makeProps(undefined)} />
      , { wrapper: BrowserRouter });

    const directorRadio = screen.getByLabelText("Director") as HTMLInputElement;
    const actorRadion = screen.getByLabelText("Actor") as HTMLInputElement;
    expect(actorRadion.checked).toBe(false);
    expect(directorRadio.checked).toBe(true);
  });

})
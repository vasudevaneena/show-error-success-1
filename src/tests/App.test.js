import React from "react";
import Adapter from "enzyme-adapter-react-16";
import { configure, shallow, mount } from "enzyme";
import App from "../App";

configure({ adapter: new Adapter() });

let wrapper;

beforeEach(() => {
  wrapper = mount(<App />);
});

describe("App snapshot", () => {
  test("matches snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });
});

describe("<App /> rendering", () => {
  it("should render one <section>", () => {
    expect(wrapper.find("section")).toHaveLength(1);
  });
  it("should render one <header>", () => {
    expect(wrapper.find("header")).toHaveLength(1);
  });
  it("should render child component  <Response>", () => {
    expect(wrapper.find("Response")).toHaveLength(1);
  });
  it("should render one <form>", () => {
    expect(wrapper.find("form")).toHaveLength(1);
  });
  it("should render 2 <input>s", () => {
    expect(wrapper.find("input")).toHaveLength(2);
  });
  it("should render 2 <label>s", () => {
    expect(wrapper.find("label")).toHaveLength(2);
  });
  it("should render 1 <button>s", () => {
    expect(wrapper.find("button")).toHaveLength(1);
  });
});
describe("<Form /> interactions", () => {
  it("should update the email input field", async () => {
    wrapper = shallow(<App />);
    wrapper.instance().forceUpdate();
    wrapper.update();
    await wrapper
      .find("#test-email")
      .simulate("change", { target: { value: "xyz@gmail.com" } });

    expect(wrapper.state("email")).toEqual("xyz@gmail.com");
    expect(wrapper.find("#test-email").props().value).toBe("xyz@gmail.com");
  });

  it("should update the password field", () => {
    wrapper = shallow(<App />);
    wrapper.instance().forceUpdate();
    wrapper.update();
    wrapper
      .find("#test-password")
      .simulate("change", { target: { value: "password@12345" } });

    expect(wrapper.state("password")).toEqual("password@12345");
    expect(wrapper.find("#test-password").props().value).toBe("password@12345");
  });
});

describe("Button Click", () => {
  wrapper = mount(<App />);
  wrapper.instance().forceUpdate();
  wrapper.update();
  it("should not show errors for vaid values", async () => {
    wrapper
      .find("#test-email")
      .simulate("change", { target: { value: "abc@gmail.com" } });
    wrapper
      .find("#test-password")
      .simulate("change", { target: { value: "password@1234" } });
    await wrapper.find("#test-button").simulate("click");
    expect(wrapper.state("errors")).toEqual({});
  });
});

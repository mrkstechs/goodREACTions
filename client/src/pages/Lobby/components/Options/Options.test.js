import React from "react";
import { screen, render, fireEvent } from "@testing-library/react";
import Options from "./index";

describe("Options", () => {
    it("Updates category state ", () => {


        const config ={
            category: "any",
            difficulty: "any",
            timer: "30",
            maxPlayers: "4",
            numQuestions: "10"
        }

        const { getByText } = render(
            <Options config={config}/>
          );

        const handler = jest.fn() 
        fireEvent.change(screen.getByRole("combobox", {name: "category"}), {target : {value: "9"}})

        expect(handler).toHaveBeenCalled()
    })
})

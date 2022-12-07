import React from "react";
import { screen, render, fireEvent } from "@testing-library/react";
import Options from "./index";

describe("Options", () => {
    it("Updates category state ", () => {

        const updateCategory = jest.fn() 
        const { getByText } = render(
            <Options
                category="any" 
                difficulty="any" 
                timer="30" 
                maxPlayers="4"
                numQuestions="10"
            />
          );

        fireEvent.keyDown(screen.getByRole("combobox", {name: "category"}))

        expect(updateCategory).toHaveBeenCalledWith("9")

    })

})

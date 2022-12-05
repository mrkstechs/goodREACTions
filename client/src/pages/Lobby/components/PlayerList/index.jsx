import React from "react";

function PlayerList ({ options }) {

    return  <div id="lobbyPlayerList">
                <h2>Players:</h2>
                <h4>0 / {options.maxPlayers}</h4>
            </div>
}

export default PlayerList;
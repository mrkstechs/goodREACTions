import React, { useState }  from "react";

import { socket } from '../../../Homepage/Index'

function PlayerList ({ options, initUserList }) {

    const [userList, updateUserList] = useState(initUserList);

    socket.on("user-joined", (newUserList) => {
        updateUserList(newUserList)
    })

    console.log("userList:", userList)

    return  <div id="lobbyPlayerList">
                <h2>Players:</h2>
                <h4>0 / {options.maxPlayers}</h4>
                <ul>
                    {/* {userList.forEach((user, i) => <li key={i}>{user}</li>)} */}
                </ul>
            </div>
}

export default PlayerList;
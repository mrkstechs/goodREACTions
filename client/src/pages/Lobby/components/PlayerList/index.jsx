import React, { useState }  from "react";
import { useEffect } from "react";

import { socket } from '../../../Homepage/Index'

function PlayerList ({ lobbyId, options, initUserList }) {

    const [userList, updateUserList] = useState(initUserList);

    socket.on("user-joined", (newUserList) => {
        updateUserList(newUserList)
        console.log(userList)
    })

    useEffect(() => {
        socket.emit("get-user-list", lobbyId)
        socket.on("send-user-list", (newUserList) => {
            updateUserList(newUserList)
        })
    }, [])


    console.log("userList:", userList)

    return  <div id="lobbyPlayerList" role="region" aria-label="player list">
                <h2>Players:</h2>
                <h4>0 / {options.maxPlayers}</h4>
                <ul>
                    {userList.map((user, i) => <li key={i}>{user}</li>)}
                </ul>
            </div>
}

export default PlayerList;
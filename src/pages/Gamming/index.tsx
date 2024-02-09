import {
  Background,
  ButtonOptions,
  HeaderUserPoints,
  Chat,
  Modal,
  Carts,
  Map,
  Player,
  GetBonus,
  GameOver,
  QuestionComponent,
  ControllerSoud,
  Time
} from "../../components";

import { useGammingController } from "../../controller/useGammingController";
import { useListenGetBonus } from "../../controller/useListenGetBonus";
import { useQuestionController } from "../../controller/useQuesitonController";

import { socket } from "../../service/socketio";

import styles from "./styles.module.css";

export function Gamming() {

  const { gammingFetch } = useGammingController();
  const { closeRoom, usersInRoom, room, username, statusGame } = gammingFetch();

  const { listenBonusFetch } = useListenGetBonus();
  const { bonus } = listenBonusFetch();

  const { questionFetch } = useQuestionController();
  const questionController = questionFetch();

  const { playerPoints, handleResponse } = questionController;

  return (
    <Background>
      <Modal.Root isOpen={usersInRoom < 2} onCloseModal={closeRoom}>
        <div className={styles['modal-info']}>
          AGUARDANDO OUTRO USUÁRIO SE CONECTAR...
          <div className={styles['cod-room']}>O Código da sala é:
            <p className={styles.room}>{room.toUpperCase()}</p>
          </div>
        </div>
      </Modal.Root>

      <ButtonOptions.Root>
        <ControllerSoud />
        <ButtonOptions.Icon type="close" action={closeRoom} />
      </ButtonOptions.Root>

      <HeaderUserPoints
        challengeCorrent={playerPoints.correct}
        challengeIncorrect={playerPoints.incorrect}
        totalPoints={playerPoints.totalPoints}
      />

      <Map>
        {bonus?.player === socket.id &&
          <>
            {GetBonus({ value: bonus.valueBonus })}
          </>
        }

        {statusGame?.players &&
          <>
            <Player
              type="man"
              playerStatus={statusGame.players.playerOne}
              status={statusGame?.status}
              name={username.toUpperCase()}
            />

            <Player
              type="woman"
              playerStatus={statusGame.players.playerTwo}
              status={statusGame?.status}
              name={username.toUpperCase()}
            />
          </>
        }
      </Map>

      <Chat />

      {questionController.playerChallenge &&
        <QuestionComponent
          isOpen={questionController.playerChallenge === socket.id}
          onDragWord={questionController.onDragWord}
          question={questionController.question}
          words={questionController.words}
          wordsOrganized={questionController.wordsOrganized}
          room={room}
          confirmReponse={questionController.confirmReponse}
          
          handleResponse={handleResponse}
        />
      }

      {<>{GameOver()}</>}

      {questionController.playerChallenge === "" &&
        <Carts
          key={`status-game-${statusGame?.status}`}
          namePlayer={`JOGADOR: ${username.toUpperCase()}`}
          isOpen={statusGame?.focus === socket.id}
          room={room}
        />
      }

      <div
        className={styles['info-room']}
      >
        SALA: {room}
      </div>


      {(questionController.playerChallenge === "" && statusGame?.focus !== socket.id) &&
        <div
          className={styles['alter-turn']}
        >
          AGUARDANDO JOGADA DO OPONENTE...
        </div>
      }

      {(questionController.playerChallenge !== "" && questionController.playerChallenge !== socket.id) &&
        <div
          className={styles['alter-turn']}
        >
          <Time
            onTimeOver={() => { }}
          />

          AGUARDANDO OPONENTE RESOLVER O DESAFIO...
        </div>
      }
    </Background>
  )
}
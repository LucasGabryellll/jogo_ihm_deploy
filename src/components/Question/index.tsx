import { DragDropContext, DropResult } from "@hello-pangea/dnd";

import { Config, DragWords } from "../DragWords";
import { Word } from "../Word";
import { Question, WordProps } from "../../model/questions";

import { Time } from "..";

import styles from "./styles.module.css";
import { ConfirmProps } from "../../controller/state/questionState";

const ConfigDragOrganized: Config = {
  id: 'dragOrganized',
  direction: "horizontal"
}

const ConfigDragInitial: Config = {
  id: 'dragInitial',
  direction: "horizontal"
}

interface QuestionProps {
  question: Question | undefined
  words: WordProps[] | undefined,
  wordsOrganized: WordProps[] | undefined,
  onDragWord: (result: DropResult) => void;

  isOpen: boolean;

  room: string;
  handleResponse: {
    sendResponse: (room: string) => void;
    handleTimeOver: (room: string) => void;
  },

  confirmReponse: ConfirmProps | undefined
}

export function QuestionComponent({
  isOpen, onDragWord,
  question,
  words, wordsOrganized,
  handleResponse, room,
  confirmReponse
}: QuestionProps) {

  if (!isOpen) return null;

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Time
          onTimeOver={() => handleResponse.handleTimeOver(room)}
        />

        <h1 className={styles.title}>{question?.question.toUpperCase()}</h1>

        <DragDropContext
          onDragEnd={onDragWord}
        >
          <div className={styles['content-organized']}>
            <p>SOLTE AQUI:</p>

            <DragWords
              config={ConfigDragOrganized}
            >
              {wordsOrganized?.map((value, index) => (
                <Word
                  key={`word_organized-${value.id}`}
                  index={index}
                  word={value}
                />
              ))}
            </DragWords>

          </div>

          <DragWords
            config={ConfigDragInitial}
          >
            {words?.map((value, index) => (
              <Word
                key={`word_mistured-${value.id}`}
                index={index}
                word={value}
              />
            ))}
          </DragWords>
        </DragDropContext>

        <button
          className={styles['container-button']}
          onClick={() => handleResponse.sendResponse(room)}
        >
          CONFIMAR RESPOSTA
        </button>

        {confirmReponse?.isSendReponse &&
          <div className={styles['content-gabarit']} style={{ backgroundColor: confirmReponse?.isCorrect ? 'rgba(25, 219, 193, 0.8)' : 'red' }}>
            <p>
              RESPOSTA: {confirmReponse.isCorrect ? "CORRETA": "ERRADA!"}
            </p>

            <p>GABARITO:</p>
            <p className={styles['word-gabarit']}>
              {question?.original_word}
            </p>
          </div>
        }
      </div>
    </div>
  )
}
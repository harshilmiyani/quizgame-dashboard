import React, { FC } from "react";
import { Input } from "./Input";
import { Button } from "./ui/Button";

export type QuestionUpdateDetailsType =
  | "name"
  | "optiona"
  | "optionb"
  | "optionc"
  | "optiond"
  | "markedAnswer";

interface IQuestionProps {
  showDelete: boolean;
  questionName: string;
  optiona: string;
  optionb: string;
  optionc: string;
  optiond: string;
  onUpdateDetails: (text: string, type: QuestionUpdateDetailsType) => void;
  onDelete: () => void;
  answer: string;
}

const Question: FC<IQuestionProps> = (props) => {
  const {
    onUpdateDetails,
    optiona,
    optionb,
    optionc,
    optiond,
    questionName,
    showDelete,
    onDelete,
    answer,
  } = props;

  return (
    <div className="border-2 border-gray-200  shadow-md rounded-lg p-4">
      {showDelete && (
        <Button className="float-end" onClick={onDelete}>
          Delete
        </Button>
      )}

      <Input
        label="Enter Question"
        placeholder="Enter Question"
        className=""
        value={questionName}
        onChange={(e) => onUpdateDetails(e.target.value, "name")}
      />
      <p className="mt-4">Options:</p>
      <div className="flex mt-2 gap-y-4 flex-col">
        <div className="flex items-center gap-x-2">
          <Input
            placeholder="Option A"
            value={optiona}
            onChange={(e) => onUpdateDetails(e.target.value, "optiona")}
          />
          <Button onClick={() => onUpdateDetails(optiona, "markedAnswer")}>
            {answer && optiona === answer
              ? "Marked As Correct"
              : "Mark as correct"}
          </Button>
        </div>
        <div className="flex items-center gap-x-2">
          <Input
            placeholder="Option B"
            value={optionb}
            onChange={(e) => onUpdateDetails(e.target.value, "optionb")}
          />
          <Button onClick={() => onUpdateDetails(optionb, "markedAnswer")}>
            {answer && optionb === answer
              ? "Marked As Correct"
              : "Mark as correct"}
          </Button>
        </div>
        <div className="flex items-center gap-x-2">
          <Input
            placeholder="Option C"
            value={optionc}
            onChange={(e) => onUpdateDetails(e.target.value, "optionc")}
          />
          <Button onClick={() => onUpdateDetails(optionc, "markedAnswer")}>
            {answer && optionc === answer
              ? "Marked As Correct"
              : "Mark as correct"}
          </Button>
        </div>
        <div className="flex items-center gap-x-2">
          <Input
            placeholder="Option D"
            value={optiond}
            onChange={(e) => onUpdateDetails(e.target.value, "optiond")}
          />
          <Button onClick={() => onUpdateDetails(optiond, "markedAnswer")}>
            {answer && optiond === answer
              ? "Marked As Correct"
              : "Mark as correct"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Question;

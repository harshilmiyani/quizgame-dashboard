import React, { useEffect, useState } from "react";
import Dropdown from "./Dropdown";
import { Input } from "./Input";
import TextArea from "./TextArea";
import DatePicker from "./ui/DatePicker";
import { Label } from "./ui/Label";
import { Switch } from "./ui/Switch";
import Question from "./Question";
import { Button } from "./ui/Button";
import { APIEndpoints, axiosClient } from "../pages/api/config";
import { format } from "date-fns";

interface CategoryType {
  id: string;
  title: string;
  checked: boolean;
}

interface CategoryResponseItemType {
  id: string;
  category: string;
}

interface QuestionType {
  question: string;
  optiona: string;
  optionb: string;
  optionc: string;
  optiond: string;
  answer: string;
}

interface IContestFormDataType {
  contestName: string;
  description: string;
  image: string;
  isLive: boolean;
  entryCoins: number;
  participants: number;
  winnerAnnouncement: Date;
  winnerCoinsPrize: number;
  end_date: Date;
  quizQuestions: QuestionType[];
}

const initialFormData: IContestFormDataType = {
  contestName: "",
  description: "",
  end_date: new Date(),
  entryCoins: 0,
  image: "",
  isLive: false,
  participants: 0,
  quizQuestions: [
    {
      question: "",
      optiona: "",
      optionb: "",
      optionc: "",
      optiond: "",
      answer: "",
    },
  ],
  winnerAnnouncement: new Date(),
  winnerCoinsPrize: 0,
};

const readJsonFile = (file: Blob) =>
  new Promise((resolve, reject) => {
    const fileReader = new FileReader();

    fileReader.onload = (event) => {
      if (event.target) {
        resolve(JSON.parse(event.target.result as string));
      }
    };

    fileReader.onerror = (error: unknown) => reject(error);
    fileReader.readAsText(file);
  });

const CreateContestForm = () => {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [contestFormData, setContestFormData] =
    useState<IContestFormDataType>(initialFormData);

  const getCategoriesData = async () => {
    try {
      const { data: categoriesResponse } = await axiosClient.get(
        APIEndpoints.getCategories
      );
      if (categoriesResponse.categories) {
        const newCategories = categoriesResponse.categories.map(
          (i: CategoryResponseItemType) => ({
            title: i.category,
            checked: false,
            id: i.id,
          })
        );
        setCategories(newCategories);
      }
    } catch (error) {
      console.log("error:", error);
    }
  };

  useEffect(() => {
    getCategoriesData();
  }, []);

  const handleFormValuesUpdate = (
    key: keyof IContestFormDataType,
    value: string | number | boolean | Date
  ) => {
    setContestFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleQuestionDetailsUpdate = (
    index: number,
    key: keyof QuestionType,
    value: string
  ) => {
    setContestFormData((prev) => ({
      ...prev,
      quizQuestions: prev.quizQuestions?.map((qItem, qIndex) =>
        index === qIndex ? { ...qItem, [key]: value } : qItem
      ),
    }));
  };

  const handleSubmitContest = async () => {
    try {
      const payload = {
        ...contestFormData,

        categoryId: categories.find((i) => i.checked)?.id,
        winnerAnnouncement: format(
          contestFormData.winnerAnnouncement,
          "dd-MM-yyyy"
        ),
        end_date: format(contestFormData.end_date, "dd-MM-yyyy"),
        entryCoins: Number(contestFormData.entryCoins),
        participants: Number(contestFormData.participants),
        winnerCoinsPrize: Number(contestFormData.winnerCoinsPrize),
      };
      console.log("🚀 ~ handleSubmitContest ~ payload:", payload);
      const response = await axiosClient.post(
        APIEndpoints.createContent,
        payload
      );
      if (response.status === 200) {
        alert("Success");
        setContestFormData(initialFormData);
      } else {
        alert("Failed to create contest");
      }
    } catch (error) {
      console.log("~ error:", error);
      alert("Failed to create contest");
    }
  };

  const handleAddNewQuestion = () => {
    setContestFormData((prev) => ({
      ...prev,
      quizQuestions: [
        ...prev.quizQuestions,
        {
          question: "",
          optiona: "",
          optionb: "",
          optionc: "",
          optiond: "",
          answer: "",
        },
      ],
    }));
  };

  const onChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const parsedData = await readJsonFile(event.target.files[0]);
      setContestFormData((prev) => ({
        ...prev,
        quizQuestions: [...parsedData?.quizQuestions],
      }));
      console.log(parsedData);
    }
  };
  const handleDeleteQuestion = () => {
    setContestFormData((prev) => ({
      ...prev,
      quizQuestions: [...prev.quizQuestions].slice(0, -1),
    }));
  };

  return (
    <div className="mt-24 flex flex-col gap-8 pb-64">
      <Input
        label="Contest Name"
        className="w-96"
        placeholder="Enter Contest Name"
        required
        value={contestFormData.contestName}
        onChange={(e) => handleFormValuesUpdate("contestName", e.target.value)}
      />
      <TextArea
        label="Contest Description"
        className="w-[40pc]"
        placeholder="Enter Contest Description"
        multiple
        required
        value={contestFormData.description}
        onChange={(e) => handleFormValuesUpdate("description", e.target.value)}
      />
      <Input
        label="Contest Image"
        className="w-96"
        placeholder="Enter Contest Image URL"
        required
        value={contestFormData.image}
        onChange={(e) => handleFormValuesUpdate("image", e.target.value)}
      />
      <div>
        <Dropdown
          onSelectOption={(checked, id) => {
            setCategories((prev) =>
              prev.map((i) =>
                i.id === id ? { ...i, checked } : { ...i, checked: false }
              )
            );
          }}
          options={categories}
          title="Select Contest Category"
        />
      </div>
      <div className="flex items-center space-x-2">
        <Switch
          id="contest-live"
          checked={contestFormData.isLive ?? false}
          onCheckedChange={(checked) =>
            handleFormValuesUpdate("isLive", checked)
          }
        />
        <Label htmlFor="contest-live">Is Contest Live?</Label>
      </div>
      <Input
        label="Contest Entry Coins"
        className="w-96"
        placeholder="Enter Contest Entry Coins"
        type="number"
        required
        value={contestFormData.entryCoins}
        onChange={(e) => handleFormValuesUpdate("entryCoins", e.target.value)}
      />
      <Input
        label="Contest Participants"
        className="w-96"
        placeholder="Enter Contest Participants"
        type="number"
        required
        value={contestFormData.participants}
        onChange={(e) => handleFormValuesUpdate("participants", e.target.value)}
      />
      <Input
        label="Contest Winner Coin Prize"
        className="w-96"
        placeholder="Enter Contest Winner Coin Prize"
        type="number"
        required
        value={contestFormData.winnerCoinsPrize}
        onChange={(e) =>
          handleFormValuesUpdate("winnerCoinsPrize", e.target.value)
        }
      />
      <DatePicker
        title="Select Winner Annoucement Date"
        date={contestFormData.winnerAnnouncement}
        onSelectDate={(_, selectedDay) => {
          handleFormValuesUpdate(
            "winnerAnnouncement",
            selectedDay || new Date()
          );
        }}
      />
      <DatePicker
        title="Select Contest End Date"
        date={contestFormData.end_date}
        onSelectDate={(_, selectedDay) => {
          handleFormValuesUpdate("end_date", selectedDay || new Date());
        }}
      />

      <p className="text-3xl font-semibold mt-8">Add Questions</p>
      <div className="bg-gray-400 h-0.5" />

      <div className="gap-4 flex flex-col">
        <Label htmlFor="quejson">Upload JSON file of Questions</Label>
        <Input
          id="quejson"
          type="file"
          accept=".json,application/json"
          onChange={onChange}
        />
        {contestFormData.quizQuestions?.map((qItem, qIndex) => (
          <Question
            key={`question-${qIndex}`}
            showDelete={
              (contestFormData.quizQuestions?.length || 1) - 1 === qIndex
            }
            onDelete={handleDeleteQuestion}
            onUpdateDetails={(text, type) => {
              if (type === "markedAnswer") {
                handleQuestionDetailsUpdate(qIndex, "answer", text);
              } else if (type === "name") {
                handleQuestionDetailsUpdate(qIndex, "question", text);
              } else {
                handleQuestionDetailsUpdate(qIndex, type, text);
              }
            }}
            questionName={qItem.question}
            {...qItem}
          />
        ))}
        <Button className="self-end" onClick={handleAddNewQuestion}>
          Add new question
        </Button>
      </div>

      <Button className="mt-8 py-8" onClick={() => handleSubmitContest()}>
        SUBMIT CONTEST
      </Button>
    </div>
  );
};

export default CreateContestForm;

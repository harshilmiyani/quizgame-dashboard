import CreateContestForm from "@/components/CreateContestForm";

export default function Home() {
  return (
    <div className="flex flex-col px-20">
      <h1 className="text-center mt-8 text-2xl font-semibold">
        Quiz App Dashboard
      </h1>
      <CreateContestForm />
    </div>
  );
}

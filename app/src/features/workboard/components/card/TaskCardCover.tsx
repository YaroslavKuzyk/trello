type TaskCardCoverProps = {
  src: string;
};

function TaskCardCover({ src }: TaskCardCoverProps) {
  return (
    <img
      src={src}
      alt=""
      className="h-40 min-h-full w-full object-cover [grid-area:1/1]"
    />
  );
}

export default TaskCardCover;

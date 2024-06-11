import * as React from "react";

const Contest: React.FC<{ contest: object; onClick: any }> = ({
  contest,
  onClick,
}) => {
  const handleClick = (e) => {
    e.preventDefault();

    // Navigate to a new view
    onClick(contest.id);
  };

  return (
    <div className="contest-preview" onClick={handleClick}>
      <div className="category">{contest.categoryName}</div>
      <div className="contest">{contest.contestName}</div>
    </div>
  );
};

export default Contest;

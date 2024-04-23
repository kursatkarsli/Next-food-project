import React from "react";
import classes from "./page.module.css";
import Image from "next/image";
import { getMeal } from "@/lib/meals";
import { notFound } from "next/navigation";
async function DynamicMealRoute({ params }) {
  const meal = await getMeal(params.slug);
  if (!meal) {
    notFound();
  }
  console.log('MEAL ', meal.image)
  meal.instructions = meal.instructions?.replace(/\n/g, "<br />");
  return (
    <header className={classes.header}>
      <div className={classes.image}>
        <Image
          src={`https://nextjsprojectmaximillian.s3.amazonaws.com/images/${meal.image}`}
          alt={meal.title}
          fill
        />
      </div>
      <div className={classes.headerText}>
        <h1>{meal.title}</h1>
        <p className={classes.creator}>
          by <a href={`mailto:${meal.creator_email}`}>{meal.creator_name}</a>
        </p>
        <p className={classes.summary}>{meal.summary}</p>
        <main>
          <p
            className={classes.instructions}
            dangerouslySetInnerHTML={{
              __html: meal.instructions,
            }}
          ></p>
        </main>
      </div>
    </header>
  );
}

export default DynamicMealRoute;

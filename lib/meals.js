import sql from "better-sqlite3";
import slugify from "slugify";
import xss from "xss";
import fs from "node:fs";
const db = sql("meals.db");
export async function getMeals() {
  await new Promise((resolve, reject) => setTimeout(resolve, 2000));
  //   throw new Error('Failed To Fetch meal data');
  return db.prepare("SELECT * FROM meals").all();
}

export async function getMeal(slug) {
  await new Promise((resolve, reject) => setTimeout(resolve, 2000));
  //   throw new Error('Failed To Fetch meal data');
  return db.prepare("SELECT * FROM meals WHERE slug = ?").get(slug);
  // in this section ? is placeholder and get function getting parameter that fills placeholder
}
export async function saveMeal(meal) {
  meal.slug = slugify(meal.title, { lower: true });
  meal.instructions = xss(meal.instructions); // to secure our code
  const extension = meal.image.name.split(".").pop(); // to get extension
  const fileName = `${meal.slug}.${extension}`; // create file name
  const stream = fs.createWriteStream(`public/images/${fileName}`);
  const bufferedImage = await meal.image.arrayBuffer();
  stream.write(Buffer.from(bufferedImage), (error) => {
    if (error) {
      console.log(error);
      throw new Error("Save failed");
    }
    meal.image = `/images/${fileName}`;
    db.prepare(`
    INSERT INTO meals
    (title, summary, instructions, image, creator, creator_email, slug)
    VALUES (  
        @title,
        @summary,
        @instructions,
        @image,
        @creator,
        @creator_email,
        @slug
    )`).run(meal)
    stream.end();
  });
}

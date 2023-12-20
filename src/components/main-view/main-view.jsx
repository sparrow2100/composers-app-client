import React from "react";
import { useState } from "react";
import { ComposerCard } from "../composer-card/composer-card";
import { ComposerView } from "../composer-view/composer-view";

export const MainView = () => {
  const [composers, setComposers] = useState([
    {
      id: 1,
      name: "Elizabeth Maconchy",
      era: "Modern",
      img: "https://sitecoreaudioprod.umusicpub.com/sitecore_media/A8C04474-739B-4FC2-BBAD-504DBE84D23E.jpeg",
      bio: "Elizabeth Maconchy was an Irish/English composer born in 1907 in Broxbourne, England. Her family soon moved to Ireland, where she studied music in Dublin. At age sixteen, she studied at the Royal College of Music in London under Ralph Vaughan Williams and Charles Wood. After the RCM, she continued her musical studies in Prague. Besides composing, Maconchy worked throughout her life to improve the lives of composers. She organised concerts in London in response to a lack of opportunities for female composers, and was also the Chair of the Composers Guild of Great Britain for many years (the first woman to hold that position), and President of the Society for the Promotion of New Music. She is considered to be one of the greatest composers of the British Isles. ",
    },
    {
      id: 2,
      name: "Fanny Mendelssohn",
      era: "Romantic",
      img: "https://upload.wikimedia.org/wikipedia/commons/f/f1/Fanny_Hensel_1842.jpg",
      bio: "Fanny Mendelssohn (Fanny Hensel after marriage) was an early romantic German composer and pianist. She was overshadowed both in life and in history by her famous brother Felix Mendelssohn, and published many works under his name. She and Felix both studied with the same piano instructor, who gave her the ‘high praise’ “she plays like a man”, and composition instructor, who favoured Fanny’s composition skills over Felix’s. Both her father and brother seem to have been tolerant but disapproving of her composition, as they didn’t think it was a fitting activity for a woman. However, Felix often wrote to his sister to ask for advice on his compositions, and later Fanny’s husband was supportive of her publishing her works. In her life Fanny composed over 450 works, mostly piano pieces and lieder. ",
    },
    {
      id: 3,
      name: "Hildegard von Bingen",
      era: "Medieval",
      img: "http://t0.gstatic.com/images?q=tbn:ANd9GcRliY0OKc-NCtnGyZY3EXO6WVdNhdohGb_cFT_l5O70iAD_x8VpHJGYrQE8Z4NDpy7-McfzgQ",
      bio: "Hildegard von Bingen was a German abbess in the 11th and 12th centuries known not only for her sacred music, but for being a writer, philosopher, mystic, and the founder of scientific natural history in Germany and two monasteries. She wrote both the music and the lyrics of her compositions, and more of her chants survive than those of any other composer of the middle ages. Hildegard experienced religious visions starting from a young age, gained followers, and has been listed as a Saint. Seventy of her compositions, including a morality play called ‘Ordo Virtutum’, currently survive.",
    },
  ]);

  const [selectedComposer, setSelectedComposer] = useState(null);

  if (selectedComposer) {
    return (
      <ComposerView
        composer={selectedComposer}
        onBackClick={() => setSelectedComposer(null)}
      />
    );
  }

  if (composers.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
      {composers.map((composer) => {
        return (
          <ComposerCard
            key={composer.id}
            composer={composer}
            onComposerClick={(newSelectedComposer) => {
              setSelectedComposer(newSelectedComposer);
            }}
          />
        );
      })}
    </div>
  );
};

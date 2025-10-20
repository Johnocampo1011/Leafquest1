export const plants = [
    {
  name: "Aloe Vera",
  plantId: "2",
  screen: "AloeDetails",
  description: 'Aloe Vera (Aloe barbadensis Miller), also known simply as Aloe, is a stemless succulent with fleshy, green-gray leaves arranged in compact rosettes. The leaves, often up to 20 inches long, have serrated edges with small teeth. Native to the Arabian Peninsula and northeastern Africa, Aloe Vera now grows worldwide in tropical and arid regions. Historically called the “plant of immortality” by ancient Egyptians, it has been prized for its gel, rich in antibacterial and healing compounds like saponin. Today, Aloe Vera is widely used in medicine, cosmetics, and nutrition for its skin-soothing and health-promoting properties. With its elegant rosette form and resilience, it serves as both a decorative houseplant and a versatile “nature healer”.',
care: {
        waterFrequency: 7,        // every 7 days
    lightFrequency: 1,        // daily
    fertilizerFrequency: 30,  // monthly


    // maximum allowed actions per week/day
    waterThreshold: 1,        // once per week max
    lightThreshold: 7,        // up to 7 days of light exposure tracking
    fertilizerThreshold: 1,   // once per month max
      },

    CareDifficulty: 'Easy',
    Watering: 'Water deeply but infrequently, allowing the top 2 inches of soil to dry out before watering again. During spring and summer, water every 2–3 weeks, while in fall and winter extend intervals to about 4 weeks. Avoid overwatering, as soggy soil can cause root rot. After watering, allow excess water to drain completely. Aloe Vera tolerates drought better than excess moisture.',
    Lighting: 'Thrives in bright, indirect light and can adapt to full sun. A south- or west-facing window is ideal indoors, while low light may cause legginess. During winter, supplement with artificial light if natural light is limited.',
    Soil: 'Best grown in a well-draining succulent mix, ideally a blend of sod, deciduous soil, and sand (2:1:1). Add small amounts of charcoal or brick pieces to improve aeration. Commercial cactus or succulent potting mixes are also suitable.'
    },


    {   // latest trial for detailed plant data
  name: "Philodendron",
  image: "HEARTLEAF PHILODENDRON",
  plantId: "3",

  // 📱 Navigation
  screen: "PhilodendronDetails",


  // 🪴 Description
  description:
    'The Heartleaf Philodendron (Philodendron hederaceum), also known as the Sweetheart Plant, is one of the most popular and widely available types of philodendron. It is characterized by its glossy, heart-shaped leaves that emerge bronze and quickly mature into deep green. The leaves typically measure 5–10 cm (2–4 inches) long and grow on long, slender, trailing stems that can reach up to 1.2 meters (4 feet) or more indoors.Native to Brazil, Mexico, the West Indies, and tropical regions of Central and South America, this plant is naturally found in humid rainforests, swamps, and riverbanks, where it often climbs tree trunks as a vine. Belonging to the Araceae family, Philodendron hederaceum is valued for its resilience, air-purifying qualities, and low-maintenance nature, making it a great choice for novice plant owners. It is suitable for hanging baskets, bookshelves, or plant hangers where its cascading foliage can be beautifully displayed.'
,


  // 🌤️ Simplified care requirements
  care: {
    waterFrequency: 7,        // every 7 days
    lightFrequency: 1,        // daily
    fertilizerFrequency: 30,  // monthly


    // maximum allowed actions per week/day
    waterThreshold: 1,        // once per week max
    lightThreshold: 7,        // up to 7 days of light exposure tracking
    fertilizerThreshold: 1,   // once per month max
  },


  // 🌍 Environmental data
   CareDifficulty: 'Easy',
Watering:
'The Heartleaf Philodendron should be watered once a week or when its leaves begin to curl, which is a sign of thirst. Before watering, check that the top 2 cm (1 inch) of soil is dry. When watering, allow water to drain out of the bottom of the pot to ensure the roots are hydrated and to prevent root rot. The plant prefers moderate soil moisture, but it is important to let the soil dry slightly between waterings.',
Lighting:
'This plant thrives in medium to bright indirect sunlight, though it can also adapt to low light conditions with slower growth. Direct sunlight should be avoided, as it may scorch the leaves. Bright, indirect light provides the best conditions for healthy growth.',
Soil:
'Heartleaf Philodendron grows best in well-draining soil. A high-quality potting mix that retains some moisture while allowing excess water to drain is ideal.',

 plantType: "tropical",
  soilType: "well-draining",
  waterPH: "5.5–7.0",
  difficulty: "Easy",

},
{
    name: "Bird's Nest Fern",
    image: "BIRDS NEST FERN",
    plantId: 4,
    
    screen: "BirdsNestFernDetails",
    description:'Birds Nest Fern (Asplenium nidus) is a striking tropical evergreen fern native to Asia, Africa, Australia, India, and Hawaii. It is commonly found in rainforests where it grows epiphytically on trees but is widely cultivated worldwide as an ornamental houseplant. Its bright green fronds, often 2 feet long, are glossy, upright, and wavy along the edges. Unlike most ferns, its fronds are not dissected, giving the plant a bold, elegant appearance. The fronds emerge from a central rosette that resembles a bird’s nest, which is the origin of its common name. Mature plants can reach 3 to 5 feet tall and 2 to 3 feet wide, making them excellent statement pieces indoors.',
    
    care: {
    waterThreshold: 2,      // how much water per day is safe
    lightThreshold: 7,      // max safe sunlight
    fertilizerThreshold: 1, // max fertilizer per day
    waterFrequency: 3,       // can water every 1 day
    fertilizerFrequency: 45,  // can fertilize every 1 day
    lightFrequency: 1       // optional (every day is fine)
    },
    CareDifficulty: 'Moderate',
Watering: 'Birds Nest Fern prefers consistently moist but not soggy soil. Water whenever the top inch of soil becomes dry, ensuring that the soil remains evenly damp. Avoid watering directly into the center rosette, as water pooling there can lead to mold, rot, or fungal problems. Instead, water around the edges of the soil so that moisture reaches the roots without wetting the fronds. Yellowing leaves may be a sign of overwatering.',
Lighting:
'This fern thrives in medium to bright indirect light. It grows best near east- or north-facing windows indoors, where sunlight is filtered. Direct sunlight should be avoided, as harsh rays can scorch its fronds, though early morning light is usually safe. In lower light, the plant may survive but grow more slowly.',
Soil:
'Bird’s Nest Fern grows well in loose, well-draining soil that retains moisture. A peat-based potting mix enriched with organic matter is ideal for container growing. Consistent drainage is essential to prevent waterlogging.',
 plantType: "fern",
  soilType: "moist and rich",
  waterPH: "5.0–6.5",
  difficulty: "Moderate",
  },
    {
    name: "ZZ Raven",
    image: "ZZ RAVEN",
    plantId: 5,
   
    screen: "ZZRavenDetails",
    description: 'ZZ Raven (Zamioculcas zamiifolia Raven), also known as Jet-black Raven, is a succulent plant originally from Africa. It is a rare variety of ZZ plant that has gained popularity in recent years as a low-maintenance yet striking indoor plant. New leaves emerge in a fresh green color and gradually mature into dark green, dark purple, and eventually almost black glossy foliage. This pigmentation makes it a standout plant that adds bold contrast to any space.ZZ Raven typically grows 1.5 to 3 feet (45–90 cm) tall, making it suitable for both small decorative pots or as a statement piece in larger spaces. Its naturally shiny leaves require little care beyond occasional dusting with a damp cloth. Known for being nearly impossible to kill, the ZZ Raven is beloved for its resilience and adaptability, thriving in both natural and artificial lighting. However, all parts of the plant are toxic, so it should be kept away from children and pets.',
   
    care: {
    waterThreshold: 1,      // how much water per day is safe
    lightThreshold: 1,      // max safe sunlight
    fertilizerThreshold: 1, // max fertilizer per day
    waterFrequency: 1,       // can water every 1 day
    fertilizerFrequency: 1,  // can fertilize every 1 day
    lightFrequency: 1       // optional (every day is fine)
  },
CareDifficulty: 'Easy',
Watering:
'ZZ plants store water in their semi-succulent stems and thick rhizomes, which makes them drought-tolerant. They do not need frequent watering and are more likely to suffer from overwatering than underwatering. To prevent root rot, always allow the soil to dry out thoroughly between waterings.',
Lighting:
'The ZZ Raven can tolerate a wide range of light conditions, from low light to bright indirect sunlight. However, it grows best with plenty of bright, indirect light. In low-light settings, the plant may grow slowly or become leggy. Direct sunlight, particularly harsh afternoon sun, should be avoided, as it can scorch the foliage. The plant can also adapt well to fluorescent lighting, making it suitable for homes and offices without natural windows.',
Soil:
'An airy and well-draining soil mix is ideal. While the ZZ Raven can survive in standard houseplant soil, it thrives best in a mix amended with perlite, pumice, or sand to improve drainage. Consistent drainage is important to protect the rhizomes from rotting.',

name: "ZZ Raven",
  plantType: "succulent",
  soilType: "well-draining",
  waterPH: "6.0–7.5",
  difficulty: "Easy",
    },
   {
    name: "Flamingo Flowers",
    image: "ANTHURIUM",
    plantId: 6,
    
    screen: "AnthuriumDetails",
    description: 'Anthurium Laceleaf (Anthurium andraeanum), also called Flamingo Flower or Tailflower, is a tropical perennial known for its heart-shaped waxy flowers and glossy green foliage. Its vibrant spathes come in shades of red, pink, white, orange, and purple, making it a striking ornamental plant. Native to Central America, northern South America, and the Caribbean, Anthuriums are trendy indoor plants that symbolize hospitality, abundance, and happiness. This plant typically grows 5 to 9 inches tall indoors and is prized for both its exotic flowers and ease of care. The genus includes around 1,000 species, closely related to Spathiphyllum and Alocasia. With its unique tropical shape and colorful, long-lasting blooms, Laceleaf is an excellent choice for plant lovers who want a bold yet relatively low-maintenance addition to their indoor collection.',
    
    care: { 
    waterThreshold: 1,      // how much water per day is safe
    lightThreshold: 7,      // max safe sunlight
    fertilizerThreshold: 1, // max fertilizer per day
    waterFrequency: 7,       // can water every 1 day
    fertilizerFrequency: 45,  // can fertilize every 1 day
    lightFrequency: 1       // optional (every day is fine)
  },  
CareDifficulty: 'Moderate',
Watering:
'Flamingo flowers are finicky about water and dislike soil that is too dry or too soggy. During the active growing season (spring through fall), water regularly to keep the soil evenly moist, or whenever the top 2–3 inches of soil feels dry to the touch. In winter, reduce watering but do not let the soil become completely dry. Always water until it drains through the pots holes, and discard any excess water in the saucer to prevent root rot. Anthuriums are also humid-loving plants, so frequent misting can help keep them healthy. A general schedule of once-a-week watering works well, adjusting based on season and indoor conditions.',
Lighting:
'Because flamingo flowers naturally grow beneath dense rainforest canopies, they thrive in bright, indirect, or filtered light for at least six hours per day. An east-facing window or a spot a few feet away from a west- or south-facing window is ideal. Avoid direct sunlight, which can scorch the leaves. While Anthuriums can tolerate lower light, it may cause stunted growth and fewer flowers. For best results, provide steady bright, indirect light to encourage healthy foliage and blooms.',
Soil:
'In their native habitat, flamingo flowers are epiphytes and often grow without soil in tree crevices. As houseplants, they prefer a loose, coarse, and well-draining mix rich in organic matter. A soilless aroid or orchid mix works best, or amend all-purpose potting soil with orchid bark, perlite, moss, or coco coir for improved drainage and airflow. A 50-50 combination of orchid and houseplant medium is also effective.',

  plantType: "flowering tropical",
  soilType: "peat-based",
  waterPH: "5.5–6.5",
  difficulty: "Moderate",

   },
  {
    name: "Areca Palm",
    image: "ARECA PALM",
    plantId: 7,
    
    screen: "ArecaPalmDetails",
    description: 'The Areca Palm (Dypsis lutescens), also known as the Butterfly Palm, Party Palm, Bamboo Palm, Yellow Palm, or Reed Palm, is a tropical species from the Arecaceae family. Native to Madagascar and also found in regions such as El Salvador and Haiti, it is widely cultivated worldwide for its beauty and adaptability. Its smooth, golden-tipped branches and feathery yellow-green fronds resemble bamboo, giving it an elegant, airy appearance. Indoors, Areca Palms typically reach 4–6 feet tall, though in their natural habitat they can grow larger and even produce yellow, elliptical fruits. Aside from their ornamental value, they are also known as excellent natural air purifiers, releasing oxygen and improving indoor air quality. Because of their versatility and striking form, Areca Palms are popular as houseplants, privacy screens, and statement tropical accents that bring a refreshing atmosphere to any indoor space.',
    
     care: {
    waterThreshold: 1,      // how much water per day is safe
    lightThreshold: 7,      // max safe sunlight
    fertilizerThreshold: 1, // max fertilizer per day
    waterFrequency: 7,       // can water every 1 day
    fertilizerFrequency: 45,  // can fertilize every 1 day
    lightFrequency: 1       // optional (every day is fine)
  },  
CareDifficulty: 'Easy',
Watering:
'Areca Palms have relatively high water needs, especially when placed in bright light. Water thoroughly until the soil is moist, but avoid waterlogging, as the plant is sensitive to overwatering and root rot. Let the top inch of soil dry out before watering again, which is usually every 1–2 weeks depending on indoor conditions. Like many palms, Areca prefers consistently moist soil but cannot tolerate being left in a soggy potting mix. Allowing the soil to dry slightly between waterings helps keep the roots healthy.',
Lighting:
'These palms thrive in bright, indirect light and require consistent exposure to maintain their lush foliage. Indoors, the best placement is near a south- or west-facing window where they can receive filtered sunlight. Direct, harsh sun can scorch the leaves, while too little light may slow down growth. Providing steady bright light ensures the palm retains its vibrant green, feathery fronds.',
Soil:
'Areca Palms prefer slightly acidic, well-draining soil. A mix containing perlite, activated charcoal, sand, and worm castings works well, as it balances moisture retention with excellent drainage. The sand and charcoal in particular help prevent the roots from sitting in excess water, while the organic matter nourishes the plant.',

plantType: "palm",
  soilType: "loamy and well-draining",
  waterPH: "6.0–7.5",
  difficulty: "Moderate",

  },
   {
    name: "Boston Fern",
    image: "BOSTON FERN",
   
    screen: "BostonFernDetails",
    description: 'The Boston Fern (Nephrolepis exaltata Bostoniensis), also known as the Sword Fern, is a tropical evergreen plant from the Polypodiaceae family. Native to humid regions of South and Central America, Africa, the West Indies, and southern Florida, it has been a favorite houseplant for decades. Its graceful, sword-shaped fronds arch downwards, making it especially popular for hanging baskets and porch displays. The pale-green fronds can reach up to 4 feet long and 6 inches wide, with tiny alternate leaflets on both sides of the midrib. Boston Ferns also produce long, thin stolons that root upon contact with soil, forming new plants. Slightly less fussy than other fern varieties, they are an excellent choice for both beginner and experienced plant lovers. With their lush, arching foliage, Boston Ferns add timeless elegance and natural freshness to any indoor or outdoor space.',
    
     care: {
    waterThreshold: 2,      // how much water per day is safe
    lightThreshold: 7,      // max safe sunlight
    fertilizerThreshold: 1, // max fertilizer per day
    waterFrequency: 3,       // can water every 1 day
    fertilizerFrequency: 30,  // can fertilize every 1 day
    lightFrequency: 1       // optional (every day is fine)
  },  
CareDifficulty: 'Easy',
Watering:
'Boston Ferns need consistently moist soil but should never be left soggy. Water when the top inch of soil feels dry to the touch, and keep the soil slightly damp at all times. A good watering schedule is essential for a healthy fern—yellowing leaves are a sign that the plant is thirsty. High humidity is also important, so misting the fronds regularly or placing the pot on a tray of wet pebbles can help maintain proper moisture levels in the air.',
Lighting:
'These ferns thrive in bright, indirect light. Direct sunlight should be avoided, as it can scorch their delicate fronds. A north- or east-facing window indoors works best, while outdoors they should be placed in shaded or partially shaded areas. Consistent bright, filtered light helps Boston Ferns grow lush and vibrant.',
Soil:
'Boston Ferns prefer a soil mix that is both well-draining and moisture-retentive. A peat-based potting mix combined with perlite or vermiculite works well for containers, while organically rich, loamy soil is ideal for outdoor planting. Adding compost and peat improves both structure and drainage, ensuring the plants roots stay healthy. A lightweight, humus-rich soil or a soilless medium like peat and vermiculite is a perfect match for these ferns.',

plantType: "fern",
  soilType: "moist and rich",
  waterPH: "5.0–6.5",
  difficulty: "Moderate",

   },
  {
    name: "Christmas Cactus",
    image: "CHRISTMAS CACTUS",
    plantId: 9,
    
    screen: "ChristmasCactusDetails",
    description: 'Christmas Cactus (Schlumbergera spp.) is a genus of epiphytic forest cacti native to the mountain rainforests of southeast Brazil. The plant produces lantern-like flowers in shades of red, yellow, purple, white, and pink. Each flower is 1–2 inches (2–5 cm) long and bilaterally symmetrical (zygomorphic), forming chains of bright, elongated petals at the tips of stems. Tiny buds appear at the segment ends, while aerial roots grow from the flattened stems, rooting easily when they touch soil. This slow "migrating" growth pattern makes Schlumbergera unique among cacti.',
    
     care: {
    waterThreshold: 1,      // how much water per day is safe
    lightThreshold: 7,      // max safe sunlight
    fertilizerThreshold: 1, // max fertilizer per day
    waterFrequency: 10,       // can water every 1 day
    fertilizerFrequency: 1,  // can fertilize every 1 day
    lightFrequency: 60       // optional (every day is fine)
  },
CareDifficulty: 'Easy',
Watering:
'Christmas Cactus should be watered every 2–3 weeks, but only when the top one-third of the soil feels dry to the touch. Unlike desert cacti, it does not tolerate dry, sunny conditions and requires more frequent watering. Moisten the soil moderately after the surface dries to a depth of 10–30 mm. Water thoroughly until it runs out of the drainage holes, then empty any excess water from the saucer to prevent root rot. Allow the soil to dry almost completely between waterings, but avoid prolonged dryness, as it can cause bud or flower drop. Overwatering is the most common issue, leading to root and stem rot.',
Lighting:
'Christmas Cactus thrives in bright, indirect light. An east-facing window or a bright bathroom is ideal, as too much direct sun can bleach or damage the leaves. For most of the year, keep the plant in consistent bright, filtered light to encourage healthy growth and flowering.',
Soil:
'Schlumbergera requires extremely loose, lightweight, and well-draining soil to thrive. In nature, it grows epiphytically on trees or between rocks, where water drains freely. A commercial cactus or succulent mix amended with perlite is ideal. You can also use a sandy cactus mix or general-purpose potting soil with added perlite or orchid bark. Slightly acidic conditions (pH 5.5–6.5) are preferred, similar to decomposing mosses and bark. A clay pot with drainage is recommended, as it allows water to evaporate more effectively than plastic pots, preventing soggy soil.',

plantType: "succulent",
  soilType: "well-draining cactus mix",
  waterPH: "5.5–6.5",
  difficulty: "Easy",

  },
  {
    name: "Dumb Cane",
    image: "DIEFFENBACHIA",
    plantId: 10,
    
    screen: "DieffenbachiaDetails",
    description: 'Dumb Cane (Dieffenbachia seguine) is a tropical perennial from the Araceae family, native to the Caribbean and South America. It has large, variegated leaves of green, yellow, and white that give a lush appearance. Indoors it usually grows 2–3 feet tall, while in nature it can reach 6–10 feet. The name “Dumb Cane” comes from its toxic sap, which can cause temporary loss of speech if ingested, so it should be kept away from children and pets.',


     care: {
    waterThreshold: 1,      // how much water per day is safe
    lightThreshold: 7,      // max safe sunlight
    fertilizerThreshold: 1, // max fertilizer per day
    waterFrequency: 7,       // can water every 1 day
    fertilizerFrequency: 45,  // can fertilize every 1 day
    lightFrequency: 1       // optional (every day is fine)
  },  
CareDifficulty: 'Moderate',
Watering: 'Dumb Cane likes consistently moist soil but not soggy. Water once or twice a week, or when the top half of the soil has dried. Make sure water drains from the bottom and empty the saucer to prevent root rot.',
Lighting: 'This plant tolerates low light but grows best in bright, indirect sunlight. Keep it away from harsh direct light to avoid damage.',
Soil: 'Prefers well-draining, nutrient-rich soil with a pH of 5.5–6.5. Sand or perlite can be added to dense soil to improve aeration.',

plantType: "tropical",
  soilType: "peat-based",
  waterPH: "6.0–7.0",
  difficulty: "Moderate",


  },
  {
    name: "Dragon Tree",
    image: "DRACAENA",
    plantId: 11,
    
    screen: "DracaenaDetails",
    description:'The Dragon Tree (Dracaena arborea), also called Slender Dragon Tree, is native to tropical West Africa. It has dark green, lance-shaped leaves growing in a dense crown atop a smooth woody trunk. Outdoors it can reach 33 feet, but indoors its usually pruned to 6 feet. Known for its tropical, elegant look, this evergreen shrub also helps clean the air. It may bear small white flowers in spring, while older leaves naturally yellow and drop to reveal more of the trunk.',

     care: {
    waterThreshold: 1,      // how much water per day is safe
    lightThreshold: 7,      // max safe sunlight
    fertilizerThreshold: 1, // max fertilizer per day
    waterFrequency: 10,       // can water every 1 day
    fertilizerFrequency: 60,  // can fertilize every 1 day
    lightFrequency: 1       // optional (every day is fine)
  },  
CareDifficulty: 'Moderate',
Watering: 'Water only when the soil feels dry to the touch, then soak until water drains from the bottom. Allow the soil to dry between waterings, about every 1–2 weeks. In warmer months, it may need water almost daily. Avoid overwatering, as this can cause root rot. The dragon tree tolerates short drought periods.',
Lighting: 'Thrives in moderate to bright filtered light and can survive in low light or partial shade. Keep out of harsh direct sunlight, which can scorch the leaves. Plants in lower light grow slower and produce smaller, less colorful leaves.',
Soil: 'Prefers rich, loamy, well-drained soil. A loose mix with peat moss works best. Avoid wet soils, as roots rot in dampness. Containers should allow space for the plants large root system.',

 plantType: "tropical",
  soilType: "loamy and well-draining",
  waterPH: "6.0–7.0",
  difficulty: "Easy",

  },
  {
    name: "Nerve Plant",
    image: "FITTONIA",
    plantId: 12,
   
    screen: "FittoniaDetails",
    description: 'The Nerve Plant (Fittonia albivenis), also known as the Mosaic Plant, is a creeping evergreen perennial from the tropical rainforests of South America, particularly Peru and Colombia. It grows up to 8 inches tall and 18 inches wide, with dark green ovate leaves marked by striking white, red, or pink veins. Rarely flowering indoors, Fittonia produces small tubular blooms in reddish or yellowish spikes. Belonging to the Acanthaceae family, this slow-growing plant is prized for its intricate foliage and is a popular choice for hanging baskets and terrariums.',


     care: {
       waterThreshold: 2,      // how much water per day is safe
    lightThreshold: 7,      // max safe sunlight
    fertilizerThreshold: 1, // max fertilizer per day
    waterFrequency: 4,       // can water every 1 day
    fertilizerFrequency: 45,  // can fertilize every 1 day
    lightFrequency: 1       // optional (every day is fine)
  },
CareDifficulty: 'Moderate',
Watering: 'Water regularly but moderately, keeping the soil consistently moist without standing water. Deep water when the top inch of soil dries out, allowing excess to drain. Fittonia is prone to wilting if too dry but recovers quickly when watered. Mist daily to maintain humidity, but avoid overwatering to prevent root rot.',
Lighting: 'Thrives in bright, indirect sunlight for about six hours daily. Best near north- or east-facing windows or under fluorescent light. Avoid full direct sun, which can scorch the leaves, and low light, which may fade their vibrant color.',
Soil: 'Grows best in loamy, well-draining soil with a peat moss base. Prefers slightly acidic soil that retains moisture but drains well.',

 plantType: "tropical",
  soilType: "peat-based and moist",
  waterPH: "5.5–6.5",
  difficulty: "Moderate",

  },
  {    
    name: "Scarlet Star",
    image: "GUZMANIA",
    plantId: 13,
   
    screen: "GuzmaniaDetails",
    description:  'The Scarlet Star (Guzmania lingulata) is an evergreen perennial from the Bromeliaceae family, native to the rainforests of Central and South America and the West Indies. It grows up to 12 inches tall and 18 inches wide, with smooth green leaves forming a funnel-shaped rosette. Its vibrant crimson bracts hide clusters of tiny white or yellow flowers, lasting 2–5 months. This tropical epiphyte blooms only once in its lifetime, after which the plant slowly declines but produces offshoots. Its striking foliage and long-lasting color make it a popular indoor ornamental plant.',

     care: {
       waterThreshold: 2,      // how much water per day is safe
    lightThreshold: 7,      // max safe sunlight
    fertilizerThreshold: 1, // max fertilizer per day
    waterFrequency: 5,       // can water every 1 day
    fertilizerFrequency: 45,  // can fertilize every 1 day
    lightFrequency: 1       // optional (every day is fine)
  },
 CareDifficulty: 'Moderate',
Watering: 'Water the soil regularly but allow it to dry slightly before the next watering. Keep 1–2 inches of water in the central rosette (flower cup), replacing it every few days. Remove the water once bracts begin to form. Mist roots and leaves daily to maintain humidity. Always use distilled or rainwater, as the plant is sensitive to tap water chemicals.',
Lighting: 'Needs 10–12 hours of bright, indirect light daily. Place near a window with filtered light. Avoid direct sunlight, which can scorch the leaves.',
Soil: 'Thrives in bromeliad or orchid potting mix. A blend of one part soil and one part pumice or bark also works well.',

plantType: "bromeliad",
  soilType: "bark-based or orchid mix",
  waterPH: "5.0–6.0",
  difficulty: "Moderate",


  },
  {
    name: "Hoya Krimson Queen",
    image: "HOYA",
    plantId: 14,
   
    screen: "HoyaDetails",
    description: 'The Hoya Krimson Queen, also known as Hoya carnosa Variegata or Hoya Tricolor, is a trailing perennial vine from the Apocynaceae family, native to tropical Asia and Australia. It is prized for its waxy green leaves edged with white and pink, as well as clusters of fragrant, porcelain-like flowers. Indoors, it can grow up to 80 inches (2 m), while in the wild it may reach 20 feet (6 m). Its cascading habit makes it perfect for hanging baskets, adding both elegance and color to any plant collection.',

     care: {
       waterThreshold: 1,      // how much water per day is safe
    lightThreshold: 7,      // max safe sunlight
    fertilizerThreshold: 1, // max fertilizer per day
    waterFrequency: 10,       // can water every 1 day
    fertilizerFrequency: 60,  // can fertilize every 1 day
    lightFrequency: 1       // optional (every day is fine)
  },
 CareDifficulty: 'Easy',
Watering: 'Water regularly during the growing season, allowing the soil to dry at least halfway before watering thoroughly. In winter, water sparingly. Avoid overwatering, as it can cause root rot—wait until the soil is dry or the leaves slightly pucker before watering. Always let excess water drain fully.',
Lighting: 'Thrives in bright, indirect light and can tolerate some morning or evening sun. Needs at least 6 hours of light daily for strong variegation. Avoid harsh afternoon sun, which can scorch the leaves.',
Soil: 'Prefers light, well-draining soil with good aeration. A standard potting mix with added perlite or coarse sand works well. Slightly acidic to neutral soil pH is ideal.',

plantType: "epiphytic vine",
  soilType: "well-draining orchid mix",
  waterPH: "6.0–7.0",
  difficulty: "Easy",

  },
  {
    name: "Lucky Bamboo",
    image: "LUCKY BAMBOO",
    plantId: 15,
 
    screen: "LuckyBambooDetails",
    description:  'Lucky Bamboo, also called Chinese Water Bamboo, Ribbon Plant, or Friendship Bamboo, is not a true bamboo but a member of the Dracaena family. Native to Africa, it is commonly cultivated in China and Taiwan, where stems are braided into decorative forms. Indoors, it typically grows up to 2 feet tall, though it can reach over 3 feet in nature. With slender, glossy green stalks and clustered leaves at the top, it is prized for its elegant appearance and symbolism in Feng Shui as a plant of prosperity and good fortune.',

     care: {
       waterThreshold: 1,      // how much water per day is safe
    lightThreshold: 7,      // max safe sunlight
    fertilizerThreshold: 1, // max fertilizer per day
    waterFrequency: 7,       // can water every 1 day
    fertilizerFrequency: 60,  // can fertilize every 1 day
    lightFrequency: 1       // optional (every day is fine)
  },
CareDifficulty: 'Easy',
Watering: 'Lucky Bamboo can be grown in water or soil. If in water, keep roots submerged in 1–3 inches of water, topping up every few days and changing the water weekly to prevent odor and disease. Use distilled or filtered water, as the plant is sensitive to chlorine. If grown in soil, water once a week or when the top 2–3 inches are dry, keeping the soil moist but not soggy.',
Lighting: 'Prefers bright, indirect or filtered light for 4–6 hours daily. Tolerates low light but avoid direct sun, which can scorch the leaves. Pale or bleached leaves indicate too much light, while slow growth and small new leaves signal not enough light. Rotate the plant occasionally for even growth.',
Soil: 'Can thrive without soil when grown in water with pebbles for support. If potted, use well-draining, rich potting soil kept consistently moist.',

 plantType: "tropical",
  soilType: "water or pebbles",
  waterPH: "6.0–6.5",
  difficulty: "Easy",

  },
  {
    name: "Moth Orchid",
    image: "ORCHID",
    plantId: 16,
    
    screen: "OrchidDetails",
    description: 'Phalaenopsis orchids, commonly known as moth orchids, are among the most popular and beginner-friendly orchid varieties. Native to tropical Asia and Australia, they are prized for their long-lasting, arching sprays of blooms, which can last two to three months. With their graceful appearance and ease of care, they are widely grown as ornamental houseplants.',
     
      care: {
       waterThreshold: 1,      // how much water per day is safe
    lightThreshold: 7,      // max safe sunlight
    fertilizerThreshold: 1, // max fertilizer per day
    waterFrequency: 7,       // can water every 1 day
    fertilizerFrequency: 45,  // can fertilize every 1 day
    lightFrequency: 1       // optional (every day is fine)
  },
CareDifficulty: 'Moderate',
Watering: 'Water weekly in summer or when exposed roots turn silvery white. Always allow the pot to drain fully, as stagnant water can cause root rot. Most orchids prefer drying slightly between waterings. Drench thoroughly, then let the medium dry before watering again. Use tepid water and water early in the day so leaves dry before night. Overwatering is a common cause of death in orchids.',
Lighting: 'Needs bright, indirect light from an east- or south-facing window. Avoid direct rays, which can scorch leaves. Provide at least 10 hours of diffused daylight daily. Rotate the plant occasionally for even growth.',
Soil: 'Requires a special orchid-growing medium, often bark-based, to mimic natural conditions and provide proper aeration and drainage.',

 plantType: "epiphytic orchid",
  soilType: "bark-based",
  waterPH: "5.5–6.5",
  difficulty: "Moderate",

  },
  {
    name: "Umbrella Plant",
    image: "SCHEFFLERA",
    plantId: 17,

    screen: "ScheffleraDetails",
    description: 'The Umbrella Plant (Schefflera arboricola), also known as the Parasol Plant or Dwarf Umbrella Tree, is a fast-growing tropical evergreen native to China. It can reach up to 3 meters tall, though compact cultivars like Nora stay around 1.5 meters, making them ideal for indoor use. The popular Gold Capella variety features glossy, palm-like leaves with splashes of gold, yellow, and pale green variegation. With its lush evergreen foliage, adaptability to pruning, and air-purifying qualities, this plant makes an elegant addition to both tabletops and floor displays, while tolerating some neglect with ease.',

     care: {
       waterThreshold: 1,      // how much water per day is safe
    lightThreshold: 7,      // max safe sunlight
    fertilizerThreshold: 1, // max fertilizer per day
    waterFrequency: 7,       // can water every 1 day
    fertilizerFrequency: 45,  // can fertilize every 1 day
    lightFrequency: 1       // optional (every day is fine)
  },
CareDifficulty: 'Easy',
Watering: 'Water regularly during the growing season and mist the leaves to maintain humidity. Allow the soil to dry slightly before giving a deep soak. In winter, reduce watering. Check the top 75% of soil and water thoroughly when it feels dry, letting excess water drain completely. Yellowing or dropping leaves usually indicate overwatering. This Difficulty plant tolerates the occasional missed watering.',
Lighting: 'Thrives in bright, indirect light. Indoors, place near a bright window but avoid direct sunlight, which can scorch leaves. For plants without access to natural light, provide 12–18 hours of artificial light daily to keep them healthy and growing well.',
Soil: 'Best planted in rich, loose, and well-draining potting soil. Use a pathogen-free mix to ensure healthy growth.',

plantType: "tropical",
  soilType: "loamy and moist",
  waterPH: "6.0–7.0",
  difficulty: "Easy",

  },
  {
    name: "White Bird of Paradise",
    image: "STRELITZIA",
    plantId: 18,
    
    screen: "StrelitziaDetails",
    description:'The White Bird of Paradise (Strelitzia nicolai), also called Giant Bird of Paradise, is a striking tropical evergreen native to coastal regions of southern Africa, including Mozambique, Zimbabwe, and South Africa. Known for its banana-like gray-green leaves and exotic flowers of blue and white with a purplish-black spathe, it resembles a bird in flight. In the wild, it can reach 20–30 feet tall with clumping stalks and a woody stem up to 1.5 feet wide, while indoor plants usually grow 3–5 feet. Its lush, architectural foliage and year-round flowering make it a dramatic statement plant for bright indoor spaces.',

     care: {
       waterThreshold: 1,      // how much water per day is safe
    lightThreshold: 7,      // max safe sunlight
    fertilizerThreshold: 1, // max fertilizer per day
    waterFrequency: 5,       // can water every 1 day
    fertilizerFrequency: 30,  // can fertilize every 1 day
    lightFrequency: 1       // optional (every day is fine)
  },
CareDifficulty: 'Moderate',
Watering: 'Water once or twice a week, keeping the soil evenly moist but not soggy. In summer, water more frequently, while in winter, once a week is enough. Allow the top 2–3 inches of soil to dry slightly between waterings. This plant enjoys occasional showering to mimic tropical rainfall but must always have good drainage to prevent root rot.',
Lighting: 'Thrives in bright, indirect light. Place near an east- or west-facing window where it can receive filtered sunlight. Direct sun may scorch or dry the leaves, while too little light can slow growth. Consistent bright, indirect light ensures healthy foliage and blooms.',
Soil: 'Prefers well-draining, loamy soil. A mix of equal parts peat moss, perlite, and potting soil works best. Adding drainage layers or charcoal improves aeration and root health.',

 plantType: "tropical",
  soilType: "rich and well-draining",
  waterPH: "6.0–7.5",
  difficulty: "Moderate",

  },
  {
    name: "Elephant Ear",
    image: "ALOCASIA",
    plantId: 19,

    screen: "AlocasiaDetails",
    description: 'Elephant Ear (Alocasia Sumo), is a bold tropical perennial prized for its large, glossy, heart-shaped leaves. Native to Asia and eastern Australia, Alocasia belongs to the Araceae family and thrives in humid, rain-rich climates. The Sumo variety grows 5–6 feet tall in its first year and can reach 8–10 feet by the second. Its dark green leaves, up to 3–4 feet long and 2.5 feet wide, display striking white veins, with purple highlights on the undersides. Supported by reddish-black stems, this plant creates a dramatic statement indoors or in landscapes, making it a favorite among Elephant Ear varieties.',

     care: {
       waterThreshold: 2,      // how much water per day is safe
    lightThreshold: 7,      // max safe sunlight
    fertilizerThreshold: 1, // max fertilizer per day
    waterFrequency: 3,       // can water every 1 day
    fertilizerFrequency: 30,  // can fertilize every 1 day
    lightFrequency: 1       // optional (every day is fine)
  },
 CareDifficulty: 'Moderate',
Watering: 'Keep the soil consistently moist during the growing season, watering about once a week or when the top 2–3 inches have dried out. Do not let the soil dry completely, but avoid waterlogging by ensuring excess water drains through the pot. Regular watering is essential for strong, healthy growth.',
Lighting: 'Prefers bright, indirect light for at least 12–14 hours daily. Direct sunlight can scorch its leaves, while low light slows growth. Place near a bright window with filtered light to support healthy foliage.',
Soil: 'Best grown in slightly acidic, moist, well-draining, humus-rich loam. A loam mix balances silt, sand, clay, and organic matter, keeping roots healthy and well-aerated.',

plantType: "tropical",
  soilType: "moist and rich",
  waterPH: "5.5–7.0",
  difficulty: "Moderate",


  },
  {
    name: "Zebra Plant",
    image: "HAWORTHIA",
    plantId: 20,
    
    screen: "HaworthiaDetails",
    description: 'The Zebra Plant (Haworthiopsis fasciata, formerly Haworthia fasciata), also known as Zebra Cactus or Pearl Plant, is a small perennial succulent native to South Africas Cape Provinces. A member of the Asphodelaceae family, it forms compact rosettes of dark green, fleshy leaves marked with raised white stripes, giving its distinctive “zebra” appearance. Slow-growing and long-lived—sometimes lasting up to 50 years—it typically reaches 5–8 inches tall. In its natural habitat, it adapts to harsh, sandy conditions, often partly buried. Its sculptural form, resilience, and minimal care requirements make it a favorite for both beginner and experienced succulent collectors.',

     care: {
       waterThreshold: 2,      // how much water per day is safe
    lightThreshold: 7,      // max safe sunlight
    fertilizerThreshold: 1, // max fertilizer per day
    waterFrequency: 4,       // can water every 1 day
    fertilizerFrequency: 30,  // can fertilize every 1 day
    lightFrequency: 1       // optional (every day is fine)
  },
 CareDifficulty: 'Easy',
Watering: 'Water thoroughly when the top inch of soil is dry, letting excess water drain completely. Avoid letting the plant sit in water, as soggy soil can cause root rot. In spring and summer, water generously but allow the soil to dry out before watering again. In cooler months, reduce frequency. A moisture meter or finger test can help determine when to water.',
Lighting: 'Thrives in bright, indirect light but tolerates medium to low light, making it an excellent indoor plant. Avoid strong, direct sunlight, which can scorch its leaves. It can also be placed outdoors in summer with partial shade.',
Soil: 'Prefers sandy, well-draining soil. A cactus or succulent potting mix works best, especially when combined with perlite, pumice, or gravel to improve drainage. Since Zebra Plants have long roots, they do well in deeper pots that allow airflow and space for growth.',

 plantType: "tropical flowering",
  soilType: "moist and well-draining",
  waterPH: "5.5–6.5",
  difficulty: "Hard",

  },
  {
    name: "Jade Plant",
    image: "JADE PLANT",
    plantId: 21,
    
    screen: "JadePlantDetails",
    description: 'The Jade Plant (Crassula ovata), also known as the Money Plant, Friendship Plant, or Lucky Plant, is a Difficulty succulent native to South Africa, Madagascar, and the Arabian Peninsula. A long-lived shrub, it can grow up to 3 feet tall indoors, with thick, oval-shaped jade-green leaves resembling small coins. Mature plants may produce clusters of tiny white star-shaped flowers, though blooming is rare indoors. Slow-growing and easy to care for, Jade Plants are cherished as symbols of prosperity and longevity, often passed down for generations as living heirlooms.',

     care: {
       waterThreshold: 1,      // how much water per day is safe
    lightThreshold: 7,      // max safe sunlight
    fertilizerThreshold: 1, // max fertilizer per day
    waterFrequency: 10,       // can water every 1 day
    fertilizerFrequency: 60,  // can fertilize every 1 day
    lightFrequency: 1       // optional (every day is fine)
  },
CareDifficulty: 'Easy',
Watering: 'Water thoroughly every 1–2 weeks during the growing season, allowing the soil to dry out between waterings. A good rule is to water when the top 2–3 inches of soil feel dry. Reduce watering during cooler months. Since Jade Plants store water in their fleshy leaves, they tolerate drought better than overwatering. Always drain excess water to prevent root rot.',
Lighting: 'Thrives in bright light and benefits from at least 4–6 hours of sunlight daily. Place near a south- or west-facing window for best growth. While it can adapt to indirect light, too little light causes leggy growth and drooping stems. Bright light may also bring out a reddish tint on the leaves, adding to its appeal.',
Soil: 'Prefers a well-draining succulent mix, ideally a blend of sand, potting soil, and perlite or pumice. A terracotta or clay pot is recommended, as it helps absorb excess moisture. Soil should be neutral to slightly acidic (pH 5.5–7.0). Ensure proper drainage with a bottom layer of gravel or expanded clay.',

 plantType: "succulent",
  soilType: "sandy and well-draining",
  waterPH: "6.0–7.5",
  difficulty: "Easy",

  },
  {
    name: "Flaming Katy",
    image: "KALANCHOE",
    plantId: 22,
    
    screen: "KalanchoeDetails",
    description: 'The Flaming Katy (Kalanchoe blossfeldiana), also known as Christmas Kalanchoe, Widows Thrill, or Florist Kalanchoe, is a compact succulent native to Madagascar and a member of the Crassulaceae family. Reaching 12–18 inches tall, it features glossy, thick green leaves and clusters of tiny, vibrant flowers in shades of red, pink, orange, yellow, or white. This Difficulty plant is loved for its ability to bloom multiple times a year, adding bursts of color to indoor spaces. Though easy to grow and care for, it is toxic to pets if ingested. With its long-lasting blooms and minimal requirements, Flaming Katy is a favorite among beginners and experienced plant keepers alike.',


     care: {
       waterThreshold: 1,      // how much water per day is safe
    lightThreshold: 7,      // max safe sunlight
    fertilizerThreshold: 1, // max fertilizer per day
    waterFrequency: 7,       // can water every 1 day
    fertilizerFrequency: 45,  // can fertilize every 1 day
    lightFrequency: 1       // optional (every day is fine)
  },
CareDifficulty: 'Easy',
Watering: 'Water sparingly, allowing the top 1–2 inches of soil to dry out completely before watering again. During hot summer months, increase frequency to about twice a week depending on heat and humidity. Overwatering can quickly lead to root rot, so it is better to underwater than overwater. Mist the leaves occasionally to provide humidity, but avoid keeping the soil soggy.',
Lighting: 'Prefers bright, indirect light indoors and partial shade to full sun outdoors. Protect from harsh direct sunlight, which can scorch the leaves, but ensure enough light to prevent leggy growth. A bright windowsill is ideal, especially with filtered light.',
Soil: 'Thrives in a well-draining mix, such as a 50:50 blend of potting soil and cactus mix, or potting soil with added perlite or coarse sand. The soil should hold some moisture but never become waterlogged. Proper drainage is essential to keep roots healthy.',

plantType: "succulent flowering",
  soilType: "sandy and well-draining",
  waterPH: "6.0–7.5",
  difficulty: "Easy",


  },
  {
    name: "Snake Plant",
    image: "SNAKE PLANT",
    plantId: 22,
  
    screen: "SnakePlantDetails",
    description: 'The Snake Plant (Dracaena trifasciata), also known as Mother-in-Laws Tongue, Birds Nest Sansevieria, or Good Luck Plant, is a Difficulty perennial native to West and Central Africa. Its thick, upright, sword-shaped leaves feature striking green banding, with some varieties like Laurentii showing bold yellow edges, while compact types like Sansevieria Jade Hahnii form rosettes resembling birds nests. Snake Plants can range from a few inches to over 40 inches tall, depending on the variety. Known for being nearly indestructible, they tolerate neglect, low light, and drought. Aside from their ornamental appeal, they are also celebrated as natural air purifiers, capable of filtering toxins and improving indoor air quality.',

     care: {
       waterThreshold: 1,      // how much water per day is safe
    lightThreshold: 7,      // max safe sunlight
    fertilizerThreshold: 1, // max fertilizer per day
    waterFrequency: 14,       // can water every 1 day
    fertilizerFrequency: 60,  // can fertilize every 1 day
    lightFrequency: 1       // optional (every day is fine)
  },
CareDifficulty: 'Moderate',
Watering: 'Allow the soil to dry out completely before watering, then water deeply until excess drains from the pot. Overwatering can easily cause root rot, so less is better with this drought-tolerant plant. A general schedule is once a week or only when the soil is fully dry. Its thick, fleshy leaves store water, making it resilient during dry periods.',
Lighting: 'Thrives best in bright, indirect light for 8–10 hours daily but can tolerate low to medium light and even partial shade. Avoid very dark areas where growth slows, as well as prolonged direct sunlight, which can scorch leaves. East-facing windows or spots near south- or west-facing windows are ideal.',
Soil: 'Prefers a loose, well-draining potting mix, such as cactus or succulent soil. Sandy, light soils work best, while peat-heavy mixes should be avoided since they retain too much moisture. The plant is not particular about pH levels, as long as drainage is adequate.',

plantType: "succulent",
  soilType: "sandy and well-draining",
  waterPH: "6.0–7.5",
  difficulty: "Easy",

  },
  {
    name: "Spider Plant",
    image: "SPIDER PLANT",
    plantId: 23,
    
    screen: "SpiderPlantDetails",
    description: 'The Spider Plant (Chlorophytum comosum), also known as Spider Ivy or Ribbon Plant, is a Difficulty, perennial houseplant native to South Africa and now found in many tropical regions worldwide. It is prized for its arching, strap-like leaves that may be solid green or variegated with white or yellow stripes. Typically growing 12–18 inches tall, it produces small white flowers on long stems that often develop into plantlets resembling tiny “spiders.” These plantlets are easily propagated, making it a favorite beginner-friendly houseplant. With its resilience, fast growth, and air-purifying abilities, the Spider Plant remains one of the most popular and reliable indoor plants.',

     care: {
       waterThreshold: 1,      // how much water per day is safe
    lightThreshold: 7,      // max safe sunlight
    fertilizerThreshold: 1, // max fertilizer per day
    waterFrequency: 5,       // can water every 1 day
    fertilizerFrequency: 45,  // can fertilize every 1 day
    lightFrequency: 1       // optional (every day is fine)
  },
 CareDifficulty: 'Easy',
Watering: 'Keep soil lightly moist but not soggy, allowing the top half of the soil to dry before watering again. Use rainwater or distilled water if possible, as spider plants can be sensitive to chlorine and fluoride in tap water. Always empty the saucer after watering to avoid root rot. Thanks to their fleshy roots and tubers, spider plants tolerate occasional missed waterings without harm.',
Lighting: 'Prefers bright, indirect light but will adapt to medium light and partial shade. Avoid harsh direct sun, which can scorch the leaves, though filtered morning or evening light is beneficial. Indoors, east- or west-facing windows are ideal. Outdoors, they grow best in light shade.',
Soil: 'Grows well in a variety of soils but thrives in loose, loamy, well-draining mixes. A neutral pH is preferred, though spider plants can adapt to slightly acidic or slightly alkaline soil. Good aeration and drainage are key for healthy roots.',



  },
  {
    name: "Croton",
    image: "CROTON",
    plantId: 24,
   
    screen: "CrotonDetails",
    description: 'The Croton (Codiaeum variegatum), also known as Garden Croton, is a tropical shrub native to Southeast Asia and Oceania, belonging to the Euphorbiaceae family. This striking houseplant is prized for its bold, multicolored foliage, with glossy leaves splashed in green, yellow, orange, and red. Leaves vary in shape and can grow 8–12 inches long, while indoor plants typically reach 23–29 inches tall. In the wild, crotons can grow up to 10 feet. With their vivid foliage and tropical charm, crotons add a dramatic accent to indoor spaces, though they require careful care to thrive.',

     care: {
       waterThreshold: 1,      // how much water per day is safe
    lightThreshold: 7,      // max safe sunlight
    fertilizerThreshold: 1, // max fertilizer per day
    waterFrequency: 5,       // can water every 1 day
    fertilizerFrequency: 30,  // can fertilize every 1 day
    lightFrequency: 1       // optional (every day is fine)
  },
 CareDifficulty: 'Difficult',
Watering: 'Keep soil consistently moist but never soggy, watering once every 1–2 weeks or when the top inch of soil feels dry. Use distilled or filtered water if possible to prevent leaf spotting. During summer, provide about 1 inch of water per week, ensuring excess drains from the pot. Avoid both overwatering, which causes root rot, and letting the soil dry completely, which can lead to leaf drop.',
Lighting: 'Requires bright, indirect light to maintain its vivid green, yellow, orange, and red foliage. Place near an east- or west-facing window with filtered light. Crotons can tolerate low light but may lose their vibrant colors and slow in growth. Avoid harsh direct sunlight that may scorch the leaves. Grow lights can supplement lighting if needed.',
Soil:'Prefers fertile, humus-rich, well-draining soil that stays evenly moist. A mix of turf, humus, and sand in a 3:2:1 ratio is ideal, though most acidic, well-drained soils will work. Adding compost can enrich the soil and support healthier growth.',
  },
  {
    name: "Cast Iron Plant",
    image: "CAST IRON PLANT",
    plantId: 25,

    screen: "CastIronPlantDetails",
    description:  'The Cast Iron Plant (Aspidistra elatior), native to Japan, China, and Southeast Asia, is a Difficulty evergreen perennial prized for its resilience and lush, arching foliage. Growing up to 24 inches tall, it features glossy, lance-shaped leaves 12–20 inches long and sometimes produces small, bell-shaped flowers with cream and maroon tones near the soil line. Though flowering is rare indoors, it can surprise growers with its unique blooms and berry-like fruits. Slow-growing and tolerant of neglect, the Cast Iron Plant is ideal for beginners and thrives as a decorative indoor or shaded outdoor plant, earning its reputation as a nearly indestructible houseplant.',

      care: {
       waterThreshold: 1,      // how much water per day is safe
    lightThreshold: 7,      // max safe sunlight
    fertilizerThreshold: 1, // max fertilizer per day
    waterFrequency: 10,       // can water every 1 day
    fertilizerFrequency: 60,  // can fertilize every 1 day
    lightFrequency: 1       // optional (every day is fine)
  },
   CareDifficulty: 'Easy',
Watering: 'Allow soil to dry completely between waterings, then water thoroughly until excess drains out. Cast Iron Plants are Difficulty but their roots are sensitive to soggy soil, so avoid overwatering. Check soil by touch or with a stick—if it comes out dry, its time to water. Empty any standing water in the saucer to prevent root rot.',
Lighting: 'Grows well in low to bright, indirect light and is especially valued as a low-light plant. Keep it out of direct sun, which can bleach or burn the leaves. Variegated varieties require brighter light to maintain their striped foliage. Ideal spots are shaded corners or areas with indirect sunlight.',
Soil: 'Tolerates many soil types as long as they are well-draining. Prefers rich, organic soil with a slightly acidic to neutral pH. For containers, use a universal or cactus potting mix in a pot with drainage holes to prevent waterlogging. Outdoors, it can adapt to sandy, loamy, or even clay soils.',
  },
  {
    name: "Chinese Evergreen",
    image: "CHINESE EVERGREEN",
    plantId: 26,
 
    screen: "ChineseEvergreenDetails",
    description: 'The Chinese Evergreen (Aglaonema spp.), also called Philippine Evergreen, is a Difficulty tropical perennial native to Asia and New Guinea. Growing 1–3 feet tall and 2–4 feet wide, it is prized for its lush foliage with striking variegation. Cultivars like Aglaonema Osaka and Aglaonema First Diamond feature bold white and green patterned leaves, making them popular as ornamental houseplants. Belonging to the Araceae family, this slow-growing, low-maintenance plant is an ideal choice for beginners and thrives as an indoor decorative plant.',

      care: {
       waterThreshold: 1,      // how much water per day is safe
    lightThreshold: 7,      // max safe sunlight
    fertilizerThreshold: 1, // max fertilizer per day
    waterFrequency: 7,       // can water every 1 day
    fertilizerFrequency: 45,  // can fertilize every 1 day
    lightFrequency: 1       // optional (every day is fine)
  },
  CareDifficulty: 'Easy',
Watering: 'Water thoroughly, then allow the soil to partially dry before watering again. Check by inserting your finger about 2 inches deep—if dry, its time to water. Keep soil moist but never soggy, and reduce watering in cooler months to avoid overwatering.',
Lighting: 'Thrives in low to bright, indirect light, making it an excellent indoor plant. Too little light may cause leaves to turn greener, while too much light can fade variegation. Variegated varieties prefer brighter, indirect light, but all should be kept out of direct sun to prevent leaf scorch.',
Soil: 'Prefers a well-draining, peat-based mix with added sand, perlite, or bark to improve aeration. Slightly acidic soil with a pH of 5.5–6.5 is ideal. While adaptable, it grows best in a moist but free-draining substrate.',
  },
  {
    name: "Parlor Palm",
    image: "PARLOR PALM",
    plantId: 27,
 
    screen: "ParlorPalmDetails",
    description: 'The Parlor Palm (Chamaedorea elegans) is a tropical species native to the rainforests of Mexico and Guatemala. Popular as an indoor plant, it features clusters of slender green stems topped with arching fronds that create a lush, tropical look. Indoors, it typically grows 4–6 feet tall and can occasionally produce small yellow flowers on mature plants. Its graceful appearance, air-purifying qualities, and adaptability to low light make it one of the most popular palms for beginners and indoor spaces.',

      
      care: {
       waterThreshold: 1,      // how much water per day is safe
    lightThreshold: 7,      // max safe sunlight
    fertilizerThreshold: 1, // max fertilizer per day
    waterFrequency: 7,       // can water every 1 day
    fertilizerFrequency: 45,  // can fertilize every 1 day
    lightFrequency: 1       // optional (every day is fine)
  },
  CareDifficulty: 'Moderate',
Watering: 'Keep soil evenly moist but never waterlogged, as parlor palms are sensitive to overwatering. Water when the top 1–2 inches of soil feels dry, then water thoroughly and allow excess to drain. Mature palms may need watering 1–3 times a week, depending on conditions. Avoid letting the soil dry out completely or stay soggy.',
Lighting: 'Thrives in medium to bright, indirect light but can also tolerate low light. Best near a north-facing window or filtered light source. Avoid intense, direct sunlight, which can scorch the fronds.',
Soil: 'Prefers well-draining soil that is slightly acidic to neutral. A peat-based palm mix with added sand or perlite works well. Ensure proper drainage to prevent moisture stagnation; placing clay or stones at the bottom of the pot helps.',
  },
  {
    name: "Peace Lily",
    image: "PEACE LILY",
    plantId: 28,
   
    screen: "PeaceLilyDetails",
    description: 'The Peace Lily (Spathiphyllum spp.) is a tropical evergreen plant from Central and South America, belonging to the Araceae family. Popular as an indoor plant, it is admired for its glossy green leaves and elegant white blooms, which resemble true lilies. Growing up to 16 inches tall indoors, it thrives in shaded areas and doubles as a natural air purifier. Its ease of care, graceful flowers, and tolerance for low light make it one of the most popular houseplants worldwide.',

      care: {
       waterThreshold: 2,      // how much water per day is safe
    lightThreshold: 7,      // max safe sunlight
    fertilizerThreshold: 1, // max fertilizer per day
    waterFrequency: 4,       // can water every 1 day
    fertilizerFrequency: 30,  // can fertilize every 1 day
    lightFrequency: 1       // optional (every day is fine)
  },
    CareDifficulty: 'Moderate',
Watering: 'Keep soil lightly moist but not soggy. Water when the top 1 inch feels dry, usually once to twice a week depending on conditions. Peace lilies prefer slight under-watering to over-watering, as excess moisture can cause root issues. Brown tips may appear if humidity is too low or watering is inconsistent.',
Lighting: 'Thrives in medium to bright, indirect light but can also adapt to low light. Best placed near an east- or north-facing window. Avoid direct sunlight, which can scorch the leaves. Peace lilies also tolerate fluorescent lighting, making them ideal for offices and shaded indoor spaces.',
Soil: 'Prefers rich, loose, and well-draining soil with plenty of organic matter. Aroid or universal potting mixes with added perlite or bark work well to prevent waterlogging while retaining moisture.',
  },
  {
    name: "Prayer Plant",
    image: "PRAYER PLANT",
    plantId: 29,
 
    screen: "PrayerPlantDetails",
    description: 'The Prayer Plant (Maranta leuconeura), native to the rainforests of Central and South America, is prized for its striking foliage and unique leaf movement. Its oval leaves display deep green backgrounds with lighter midribs, vivid red veins, and purplish undersides. At night, the leaves fold upright like praying hands, giving the plant its name. Growing up to 6–12 inches tall indoors, it produces small lavender flowers under the right conditions. Aside from its beauty, the Prayer Plant is pet-safe, air-purifying, and a beloved choice for creating lush, tropical displays indoors.',

      care: {
       waterThreshold: 1,      // how much water per day is safe
    lightThreshold: 7,      // max safe sunlight
    fertilizerThreshold: 1, // max fertilizer per day
    waterFrequency: 5,       // can water every 1 day
    fertilizerFrequency: 45,  // can fertilize every 1 day
    lightFrequency: 1       // optional (every day is fine)
  },
  CareDifficulty: 'Moderate',
Watering: 'Keep soil consistently moist but not soggy. Water when the top 1 inch begins to dry, typically once to thrice a week depending on season and environment. Use lukewarm, non-Difficult water to prevent leaf spotting. During the growing season (spring to fall), maintain steady moisture; in winter, allow the soil surface to dry slightly before watering again.',
Lighting: 'Prefers bright, indirect light and can tolerate partial shade. Direct sun may scorch the leaves or fade their colors. Ideal placement is near an east-facing window with filtered light. Avoid deep shade, which can limit growth, and protect from drafts.',
Soil: 'Grows best in a well-draining, slightly acidic potting mix (around pH 6.0). A standard houseplant soil with added perlite or peat works well. Ensure good drainage, and consider adding gravel at the bottom of pots to prevent waterlogging.',
  },
  {
    name: "African Violet",
    image: "AFRICAN VIOLET",
    plantId: 30,
  
    screen: "AfricanVioletDetails",
    description: 'African Violet (Saintpaulia spp.) is a compact, flowering houseplant native to the mountain rainforests of East Africa, particularly Tanzania. Growing about 4–6 inches tall and wide, it is admired for its soft, velvety leaves and delicate blooms that appear in shades of purple, blue, pink, red, or white. Introduced to Europe in the 19th century, it quickly became one of the worlds most popular houseplants due to its manageable size, charming flowers, and year-round blooming potential.',

     
      care: {
       waterThreshold: 1,      // how much water per day is safe
    lightThreshold: 7,      // max safe sunlight
    fertilizerThreshold: 1, // max fertilizer per day
    waterFrequency: 5,       // can water every 1 day
    fertilizerFrequency: 30,  // can fertilize every 1 day
    lightFrequency: 1       // optional (every day is fine)
  },
  CareDifficulty: 'Easy',
Watering: 'Keep the soil lightly moist but avoid overwatering, as the soft stems are prone to rot. Water when the soil feels slightly dry, using room-temperature water. Bottom watering is preferred—place the pot in a shallow tray of water until the surface is moist, then discard any excess. Avoid getting water on the leaves to prevent spotting or crown rot. Typically, water two to three times a week depending on conditions.',
Lighting: 'Thrives in bright, indirect light. Best placed near east- or north-facing windows, or under fluorescent/LED grow lights for 10–12 hours daily. Avoid direct sunlight, which can scorch leaves. Too much light causes pale foliage, while too little leads to leggy growth and fewer blooms.',
Soil: 'Requires a light, well-draining mix. Use commercial African violet soil or create your own blend with equal parts potting soil, peat, and perlite. A loose, airy texture prevents root rot and allows consistent moisture without waterlogging.',
  },
  {
    name: "Air Plant",
    image: "AIR PLANT",
    plantId: 31,
   
    screen: "AirPlantDetails",
    description: 'Air Plant (Tillandsia spp.) is a perennial epiphytic plant native to Mexico, Central, and South America. Unlike most plants, it grows without soil, absorbing nutrients and moisture from the air. Its narrow, oblong leaves range from green to silvery-gray and may reach up to 16 inches long, depending on the species. Some produce striking pink bracts with spike-like flowers. Tillandsias are lightweight, versatile, and easy to display, making them a popular choice for modern indoor plant collections.',


      care: {
       waterThreshold: 2,      // how much water per day is safe
    lightThreshold: 7,      // max safe sunlight
    fertilizerThreshold: 1, // max fertilizer per day
    waterFrequency: 3,       // can water every 1 day
    fertilizerFrequency: 30,  // can fertilize every 1 day
    lightFrequency: 1       // optional (every day is fine)
  },
  CareDifficulty: 'Moderate',
Watering: 'Air plants do not need soil and absorb water through their leaves. Most types thrive with a soaking method—submerge the plant in room-temperature water for 10–20 minutes once a week, then let it dry completely before placing it back. Some species prefer misting or quick dunking depending on the environment. In hotter, drier climates, water more often; in cooler, more humid conditions, less frequently. Avoid letting water sit between leaves to prevent rot.',
Lighting: 'Prefers bright, indirect light. Place near a south-, east-, or west-facing window with filtered sunlight. Too much direct light can scorch the leaves, but silver-leaved varieties tolerate brighter sun. Air plants can also thrive under artificial fluorescent or LED lighting for about 12 hours daily.',
Soil: 'Air plants are epiphytes and do not require soil. They can be mounted on bark, wood, or placed in containers with natural bases such as coconut fiber.',
  },
  {
    name: "Fiddle Leaf Fig",
    image: "FIDDLE LEAF",
    plantId: 32,
 
    screen: "FiddleLeafFigDetails",
    description: 'Fiddle Leaf Fig (Ficus lyrata) is native to the tropical rainforests of Western Africa, from Cameroon to Sierra Leone. Known for its large, violin-shaped leaves with prominent veins, it is a striking indoor plant often used as a focal point. In its natural habitat, it can grow up to 15 meters, but indoors it typically reaches 2–3 meters and can be pruned or container-limited for size control. While it can be challenging to care for, this fast-growing plant thrives when provided with warmth, humidity, and proper light.',

      care: {
       waterThreshold: 1,      // how much water per day is safe
    lightThreshold: 7,      // max safe sunlight
    fertilizerThreshold: 1, // max fertilizer per day
    waterFrequency: 7,       // can water every 1 day
    fertilizerFrequency: 45,  // can fertilize every 1 day
    lightFrequency: 1       // optional (every day is fine)
  },
   CareDifficulty: 'Difficult',
Watering: 'Water when the top inch of soil feels dry. Fiddle leaf figs prefer evenly moist soil but are highly sensitive to overwatering, which can cause root rot. Water thoroughly until excess drains from the bottom, then empty the saucer to avoid standing water. Allow 50–75% of the soil to dry before watering again. Flush the soil monthly to prevent salt buildup from fertilizers or treated water.',
Lighting: 'Requires bright, indirect light for about six hours daily. Too much direct sunlight may scorch the leaves, while insufficient light slows growth and causes brown spots. Place near an east-facing window and rotate the plant occasionally to ensure even growth. Wipe leaves regularly to remove dust and help them absorb more light.',
Soil: 'Use a well-draining indoor potting mix, ideally peat-based with added perlite, or a cactus and houseplant mix in equal parts. Good drainage is essential to prevent root issues.',
  },
  {
    name: "Swiss Cheese Plant",
    image: "MONSTERA",
    plantId: 33,
   
    screen: "MonsteraDetails",
    description: 'Swiss Cheese Plant (Monstera adansonii), also known as the “Swiss Cheese Vine” or “Monkey Mask Plant,” is a tropical perennial native to Central and South America. Recognized for its unique fenestrated leaves resembling Swiss cheese, this climbing vine can grow up to 1.5 meters indoors. Smaller and more delicate than Monstera deliciosa, it is prized for its decorative foliage. In its native regions, it grows under jungle canopies and has even been used traditionally for weaving baskets and ropes.',

      care: {
       waterThreshold: 1,      // how much water per day is safe
    lightThreshold: 7,      // max safe sunlight
    fertilizerThreshold: 1, // max fertilizer per day
    waterFrequency: 7,       // can water every 1 day
    fertilizerFrequency: 30,  // can fertilize every 1 day
    lightFrequency: 1       // optional (every day is fine)
  },
   CareDifficulty: 'Easy',
Watering: 'Water when the top inch of soil feels dry. Keep soil evenly moist but not soggy, and always allow excess water to drain from the pot. A terracotta container helps regulate moisture. Watering once or twice a week is usually enough, adjusting frequency depending on season and humidity. Higher humidity improves growth, so a humidifier is beneficial in dry conditions.',
Lighting: 'Thrives in bright, indirect light. Too much direct sunlight can scorch the leaves, while medium light slows growth. An east- or north-facing window is ideal. If placed near a brighter window, keep the plant slightly set back to avoid leaf burn.',
Soil: 'Grows best in a peat-based, well-draining potting mix that retains moisture without waterlogging. A pH between 5.5 and 7 is suitable.',
  },
  {
    name: "Polka Dot Plant",
    image: "POLKA DOT PLANT",
    plantId: 34,
  
    screen: "PolkaDotPlantDetails",
    description: 'Polka Dot Plant (Hypoestes phyllostachya), also known as the Freckle Face Plant, is a colorful perennial from Madagascar, Southeast Asia, and South Africa. It is a bushy plant with soft, oval leaves that are strikingly variegated in pink, white, or red spots. Typically reaching 30–50 cm indoors, it produces small pale flowers but is mainly grown for its foliage. Its compact size and vibrant patterns make it a popular decorative houseplant.',

      care: {
       waterThreshold: 2,      // how much water per day is safe
    lightThreshold: 7,      // max safe sunlight
    fertilizerThreshold: 1, // max fertilizer per day
    waterFrequency: 3,       // can water every 1 day
    fertilizerFrequency: 30,  // can fertilize every 1 day
    lightFrequency: 1       // optional (every day is fine)
  },
   CareDifficulty: 'Easy',
Watering: 'Keep soil consistently moist but not waterlogged. Water when the top half-inch of soil feels dry, reducing slightly in winter and resuming regular watering in spring. This plant thrives in high humidity; if the air is too dry, use a humidifier rather than misting to avoid leaf damage.',
Lighting: 'Prefers bright, indirect light, ideally near an east- or south-facing window. Too much direct sunlight can scorch and crinkle the leaves, while too little light reduces their vibrant color. A partial shade location is best for maintaining its leaf patterns.',
Soil: 'Grows well in rich, well-draining soil with organic matter. A standard indoor potting mix with added perlite or pumice works well. It can also adapt to sand, loam, or clay soils but does best in a loose mix that retains moisture without becoming soggy.',
  },
  {
    name: "Rubber Plant",
    image: "RUBBER PLANT",
    plantId: 35,
  
    screen: "RubberPlantDetails",
    description: 'The Rubber Plant (Ficus elastica), native to Southeast Asia, is a popular houseplant admired for its broad, glossy leaves and fast growth. In the wild, it can reach up to 30 meters tall, while indoors it typically grows 1.8–3 meters. Leaves are deep green, often exceeding 30 cm in length, with new growth emerging from a bright magenta sheath. Variegated cultivars, such as Tineke, display striking patterns of green, cream, and pink.',

      care: {
       waterThreshold: 1,      // how much water per day is safe
    lightThreshold: 7,      // max safe sunlight
    fertilizerThreshold: 1, // max fertilizer per day
    waterFrequency: 7,       // can water every 1 day
    fertilizerFrequency: 45,  // can fertilize every 1 day
    lightFrequency: 1       // optional (every day is fine)
  },
   CareDifficulty: 'Easy',
Watering: 'Keep soil consistently moist but not soggy. Water when the top 1–2 inches of soil feel dry, allowing the plant to slightly dry out between waterings. During active growth, water more frequently; reduce in autumn and winter to about once a week or less. Always let excess water drain from the pot to avoid root rot.',
Lighting: 'Prefers 6–8 hours of bright, indirect light daily. It can tolerate soft morning sun but should be protected from harsh afternoon rays. Too little light can cause leggy growth and leaf drop, while too much direct light may scorch leaves. Rotate the plant monthly to encourage even growth.',
Soil: 'Thrives in a well-draining houseplant mix containing peat moss or coconut coir for moisture retention and perlite or orchid bark for improved drainage.',
  },
  {
    name: "Silver Inch Plant",
    image: "TRADESCANTIA",
    plantId: 36,
   
    screen: "TradescantiaDetails",
    description: 'The Silver Inch Plant (Tradescantia zebrina), also known as Wandering Jew or Inch Plant, is a fast-growing tropical perennial native to Mexico, Central America, South America, and the Caribbean. It is admired for its trailing vines and striking foliage with silver stripes, green and purple tones, and deep magenta undersides. Leaves measure 5–7.5 cm long and cluster along thin vines, making it ideal for hanging baskets or as ground cover. Popular for its low-maintenance care and vibrant look, it is a favorite choice for both indoor and outdoor plant displays.',

      care: {
       waterThreshold: 1,      // how much water per day is safe
    lightThreshold: 7,      // max safe sunlight
    fertilizerThreshold: 1, // max fertilizer per day
    waterFrequency: 5,       // can water every 1 day
    fertilizerFrequency: 30,  // can fertilize every 1 day
    lightFrequency: 1       // optional (every day is fine)
  },
  CareDifficulty: 'Easy',
Watering: 'Keep soil slightly moist but not soggy. Water when the top 1–2 inches of soil feel dry, typically once or twice a week. Overwatering may cause root rot, while underwatering can stress the plant, leading to dull or crispy leaves. Always allow excess water to drain thoroughly.',
Lighting: 'Thrives in bright, indirect light. A north-facing window or filtered sun from an east- or south-facing window works best. Too much direct sunlight can scorch leaves, while insufficient light causes color fading. For best growth, provide bright to medium indirect light.',
Soil: 'Prefers a rich, well-draining potting mix. A standard indoor soil with added perlite or sand improves drainage. Outdoors, it grows well in slightly acidic soil (pH 5.0–6.5).',
  },
  {
    name: "Watermelon Peperomia",
    image: "WATERMELON PEPEROMIA",
    plantId: 37,
  
    screen: "WatermelonPeperomiaDetails",
    description: 'The Watermelon Peperomia (Peperomia argyreia), native to South America, is a compact tropical perennial from the Piperaceae family. Named for its striking green-and-silver variegated leaves that resemble watermelon skin, this small houseplant grows up to 12 cm tall. Its fleshy, ovoid leaves reach 5–8 cm in length, supported by red stems. In summer, it produces slender green flower spikes, though it is mainly prized for its ornamental foliage. Also called Watermelon Begonia, this plant is not related to the watermelon fruit but is popular for its unique leaf pattern and easy indoor care.',

      care: {
       waterThreshold: 1,      // how much water per day is safe
    lightThreshold: 7,      // max safe sunlight
    fertilizerThreshold: 1, // max fertilizer per day
    waterFrequency: 5,       // can water every 1 day
    fertilizerFrequency: 45,  // can fertilize every 1 day
    lightFrequency: 1       // optional (every day is fine)
  },
  CareDifficulty: 'Easy',
Watering: 'Allow the top 2–3 cm of soil to dry before watering thoroughly. Watermelon Peperomia is sensitive to both overwatering and underwatering, so keep soil evenly moist but never soggy. Water every 7–10 days during the growing season, reducing frequency in cooler months. Always use room-temperature water.',
Lighting: 'Prefers bright to medium indirect light. Direct sun can scorch its leaves, while too little light may cause smaller leaves and leggy growth. Best positioned near east- or west-facing windows.',
Soil: 'Grows best in a well-draining but moisture-retentive potting mix. A 1:1 blend of peat moss and perlite works well, or a loose mix of humus, garden soil, sand, and peat. Avoid cactus or succulent soil, which drains too quickly.',
  },
  {
    name: "Chinese Money Plant",
    image: "PILEA PEPEROMIOIDES",
    plantId: 38,
  
    screen: "",
    description: 'The Chinese Money Plant (Pilea peperomioides), also called the Friendship Plant, Coin Plant, or UFO Plant, is a perennial prized for its round, coin-like leaves and easy care. Native to Sichuan and Yunnan provinces in China, it naturally grows on shaded, moist rocks at elevations of 1,500–3,000 meters. Indoors, it reaches 30–35 cm tall, forming a central stem with glossy green leaves up to 10 cm wide on long petioles. Flowers are small and inconspicuous, appearing in clusters along the leaf axils. This pet-safe plant is low-maintenance, air-purifying, and easy to propagate, often shared with friends—hence its nickname “Friendship Plant”.',

      care: {
       waterThreshold: 1,      // how much water per day is safe
    lightThreshold: 7,      // max safe sunlight
    fertilizerThreshold: 1, // max fertilizer per day
    waterFrequency: 7,       // can water every 1 day
    fertilizerFrequency: 45,  // can fertilize every 1 day
    lightFrequency: 1       // optional (every day is fine)
  },
  CareDifficulty: 'Easy',
Watering: 'Water deeply, allowing the soil to dry slightly between waterings. Mature plants prefer to dry out more between watering, while younger plants should be watered when the soil is about 90% dry. Keep the soil lightly moist but never waterlogged, as overwatering can cause yellowing or wilting.',
Lighting: 'Thrives in bright, indirect light and does well near east- or west-facing windows. It can also adapt to low to medium light, though growth may slow. Avoid direct sunlight, which can scorch the round leaves.',
Soil: 'Grows best in a well-draining mix, such as equal parts potting soil and cactus soil, with added perlite or pumice for better aeration. Ensure excess water can drain to prevent root rot.',
  },{
    name: "Money Tree",
    image: "PACHIRA AQUATICA",
    plantId: 39,
  
    screen: "",
    description: 'The Money Tree (Pachira aquatica), also known as Malabar Chestnut, Guiana Chestnut, Provision Tree, or Saba Nut, is a tropical wetland tree native to Central and South America. In its natural habitat, it can grow up to 18 m tall, but as a houseplant, it typically stays between 1.8–2.4 m (6–8 ft). It is admired for its glossy palmate leaves resembling a hand with five fingers and is often grown with braided stems. The plant occasionally produces white flowers and edible nuts that taste similar to peanuts or chestnuts, though flowering is rare indoors. Known as a symbol of prosperity and good fortune, the Money Tree is also valued as an excellent natural air purifier.',

      care: {
       waterThreshold: 1,      // how much water per day is safe
    lightThreshold: 7,      // max safe sunlight
    fertilizerThreshold: 1, // max fertilizer per day
    waterFrequency: 7,       // can water every 1 day
    fertilizerFrequency: 45,  // can fertilize every 1 day
    lightFrequency: 1       // optional (every day is fine)
  },
  CareDifficulty: 'Easy',
Watering: 'Water thoroughly once the top inch of soil has dried. During winter, reduce watering as growth slows. Always drain excess water from the saucer to prevent root rot.',
Lighting: 'Prefers bright to medium indirect light for about six hours daily. While it tolerates partial shade, avoid harsh direct sunlight, which can scorch its leaves.',
Soil: 'Thrives in a well-draining, peat-moss-based potting mix with perlite or sand for aeration. Ideal soil pH is between 6.0 and 7.5.',
  },{
    name: "Purple Shamrock",
    image: "OXALIS TRIANGULARIS",
    plantId: 40,
  
    screen: "",
    description: 'The Purple Shamrock (Oxalis triangularis), also called False Shamrock, is a striking ornamental plant native to Brazil. Known for its deep purple, butterfly-shaped leaves that open in daylight and fold at night, it creates a unique, dynamic display. The trifoliate leaves grow in clusters, resembling fluttering butterflies, while its delicate flowers range from white to pale pink or lavender.',

      care: {
       waterThreshold: 1,      // how much water per day is safe
    lightThreshold: 7,      // max safe sunlight
    fertilizerThreshold: 1, // max fertilizer per day
    waterFrequency: 5,       // can water every 1 day
    fertilizerFrequency: 30,  // can fertilize every 1 day
    lightFrequency: 1       // optional (every day is fine)
  },
  CareDifficulty: 'Moderate',
Watering: 'During the growing season, water when the top 2–3 cm of soil has dried. In dormancy (summer), reduce to light watering every 2–3 weeks, just enough to keep the soil from drying completely. Keep the soil slightly moist but never soggy, as prolonged waterlogging can cause root rot.',
Lighting: 'Thrives in bright, indirect light and benefits from at least 4 hours of sunlight daily. Can tolerate some direct morning or late-afternoon sun. Best placed near east- or west-facing windows indoors.',
Soil: 'Grows well in any loose, well-draining soil with neutral to mildly acidic pH (5.0–7.0). A mix of peat, humus, sand, and garden soil works well to keep the roots healthy.',
  },{
    name: "Coleus",
    image: "COLEUS",
    plantId: 41,
  
    screen: "",
    description: 'Coleus (Coleus scutellarioides), also known as Painted Nettle or Flame Nettle, is a colorful foliage plant native to Southeast Asia and Malaysia. Famous for its striking patterned leaves in shades of red, yellow, green, and purple, it is widely grown as an ornamental in gardens and containers. Trailing varieties are popular in hanging baskets, while upright cultivars add bold color contrast to beds. Depending on the variety, coleus typically grows 12–36 inches tall and 10–16 inches wide, making it a versatile choice for indoor and outdoor displays.',

      care: {
       waterThreshold: 1,      // how much water per day is safe
    lightThreshold: 7,      // max safe sunlight
    fertilizerThreshold: 1, // max fertilizer per day
    waterFrequency: 5,       // can water every 1 day
    fertilizerFrequency: 30,  // can fertilize every 1 day
    lightFrequency: 1       // optional (every day is fine)
  },
   CareDifficulty: 'Easy',
Watering: 'Requires regular watering to keep the soil evenly moist but never soggy. Avoid long dry spells, which cause browning of the leaf edges. Mulch can help retain soil moisture, but avoid cedar mulch and keep mulch away from stems to prevent rot.',
Lighting: 'Prefers bright, indirect light. Traditional seed-grown varieties do best in part to full shade, while modern cultivars show better color with more sun exposure. In hot, dry climates, provide afternoon shade to protect foliage.',
Soil: 'Thrives in rich, well-draining loamy soil that stays moist without becoming waterlogged. A peat-based potting mix or soil amended with compost works well. Ideal pH is slightly acidic to neutral (6.0–7.0). Ensure containers or garden beds have good drainage.',
  },{
    name: "Begonia Rex",
    image: "BEGONIA REX",
    plantId: 42,
  
    screen: "",
    description: 'Rex Begonia (Begonia rex), also known as Painted-Leaf Begonia or Fancy-Leaf Begonia, is a tropical ornamental plant prized for its stunning foliage. Its large, oval or heart-shaped leaves display striking patterns in shades of green, silver, red, and purple, making it a dramatic addition to indoor collections. Though it flowers, it is grown mainly for its decorative leaves, which remain vibrant year-round. Native to tropical regions, this species grows moderately fast, typically reaching 8–12 inches tall and wide when mature. Rex begonias are part of the Begoniaceae family and remain a favorite among houseplant enthusiasts for their unique and colorful foliage.',

      care: {
       waterThreshold: 2,      // how much water per day is safe
    lightThreshold: 7,      // max safe sunlight
    fertilizerThreshold: 1, // max fertilizer per day
    waterFrequency: 4,       // can water every 1 day
    fertilizerFrequency: 45,  // can fertilize every 1 day
    lightFrequency: 1       // optional (every day is fine)
  },
   CareDifficulty: 'Difficult',
Watering: 'Rex begonias are sensitive to both overwatering and underwatering. Keep the soil slightly and evenly moist, allowing only the surface to dry out between waterings. Water thoroughly once a week, ensuring excess drains away to prevent root rot. Avoid letting the leaves get wet to reduce the risk of powdery mildew. These plants also appreciate higher humidity but must not sit in soggy soil.',
Lighting: 'Thrives in bright, indirect light and prefers partial sun conditions. Requires about 6–8 hours of filtered light daily. Can adapt to indoor fluorescent lighting if natural light is insufficient. Avoid direct sun, which can scorch the delicate foliage.',
Soil: 'Prefers a light, airy, and well-draining mix. A peat-based potting soil combined with perlite, sand, or bark chips works best to protect its fine roots from rot.',
  },{
    name: "Polka Dot Begonia",
    image: "BEGONIA MACULATA",
    plantId: 43,
  
    screen: "",
    description: 'The Polka Dot Begonia (Begonia maculata), also called Spotted Begonia or Clown Begonia, is a striking tropical perennial native to the Brazilian rainforests and other tropical regions of South America and Asia. Belonging to the Begoniaceae family, this semi-shrub can reach about 3.5 feet (1 meter) tall when mature. It features elongated, olive- to deep green leaves patterned with silver-white spots and contrasting reddish undersides. The plant produces clusters of delicate white or pink flowers with bright yellow stamens, adding to its dramatic ornamental appeal.',

      care: {
       waterThreshold: 2,      // how much water per day is safe
    lightThreshold: 7,      // max safe sunlight
    fertilizerThreshold: 1, // max fertilizer per day
    waterFrequency: 4,       // can water every 1 day
    fertilizerFrequency: 45,  // can fertilize every 1 day
    lightFrequency: 1       // optional (every day is fine)
  },
   CareDifficulty: 'Easy',
Watering: 'Water when the top ½ inch of soil has dried out, testing with a finger before adding more. Generally, water twice a week during summer and about once a week in cooler months, adjusting for humidity. Always allow excess water to drain and never let the roots sit in standing water to prevent rot. Avoid misting, as excess moisture on leaves can cause issues.',
Lighting: 'Thrives in bright, indirect light. Ideal placement is near an east-, west-, or south-facing window with filtered light. Can tolerate medium light, but avoid harsh direct sunlight that may scorch the leaves.',
Soil: 'Prefers a rich, porous, and well-draining potting mix. A combination of peat and perlite in equal parts works well to retain moisture while avoiding waterlogging. Loamy or sandy soil types with organic matter are also suitable.',
  },{
    name: "Calathea Orbifolia",
    image: "CALATHEA ORBIFOLIA",
    plantId: 44,
  
    screen: "",
    description: 'Calathea Orbifolia (Geoppertia orbifolia), also known as Round-Leaf Calathea, is a striking tropical plant admired for its large, broad leaves with bold silver-green striping. Native to the rainforests of South America, this species is popular as a decorative indoor plant due to its dramatic foliage and elegant form. Though somewhat fussy in care, it makes a strong statement in interior spaces. Calathea orbifolia typically grows up to 2 feet (60 cm) tall and wide in indoor settings. The name Calathea derives from the Greek word Kalathos, meaning “basket,” as its leaves were once used for weaving.',

      care: {
       waterThreshold: 1,      // how much water per day is safe
    lightThreshold: 7,      // max safe sunlight
    fertilizerThreshold: 1, // max fertilizer per day
    waterFrequency: 5,       // can water every 1 day
    fertilizerFrequency: 30,  // can fertilize every 1 day
    lightFrequency: 1       // optional (every day is fine)
  },
    CareDifficulty: 'Moderate',
Watering: 'Water when the top 2 cm of soil feels dry, preferably with rainwater or lime-free water. Keep the soil consistently moist but never waterlogged, and always remove excess water about 15 minutes after watering. Avoid letting the plant sit in standing water, as its delicate roots are prone to rot.',
Lighting: 'Prefers bright, indirect light to maintain lush, patterned foliage. Direct sunlight causes leaf scorch, fading, and brown spots, while too much shade leads to dull growth. Rotate the plant monthly to encourage balanced growth.',
Soil: 'Requires a light, airy, and moisture-retentive soil that is also well-draining. A mix of 2 parts potting soil, 1 part perlite, and a small amount of orchid bark works well to support its fine roots.',
  },{
    name: "Calathea Medallion",
    image: "CALATHEA MEDALLION",
    plantId: 45,
  
    screen: "",
    description: 'Calathea Medallion (Goeppertia veitchiana), also known simply as Calathea veitchiana, is a tropical perennial from the Marantaceae family. Native to the rainforests of South America, it is admired for its striking oval leaves with bold medallion-like patterns in shades of green and silver on top, and deep burgundy to purple undersides. Compact and ornamental, this variety typically grows up to 2 feet (60 cm) tall indoors. Though considered high-maintenance, the Calathea Medallion remains one of the most popular Calathea varieties for its vibrant foliage and dramatic display.',

      care: {
       waterThreshold: 1,      // how much water per day is safe
    lightThreshold: 7,      // max safe sunlight
    fertilizerThreshold: 1, // max fertilizer per day
    waterFrequency: 5,       // can water every 1 day
    fertilizerFrequency: 30,  // can fertilize every 1 day
    lightFrequency: 1       // optional (every day is fine)
  },
  CareDifficulty: 'Difficult',
Watering: 'Calathea Medallion requires consistent moisture but is sensitive to both drought and overwatering. Water once or twice weekly, or when the top 2–3 inches of soil are dry. Use warm, filtered, or rainwater to avoid mineral buildup. During spring and summer, water more frequently, while in winter, reduce watering. Ensure good drainage and remove excess water from saucers to prevent root rot.',
Lighting: 'Prefers medium to bright, indirect light. Direct sunlight fades the leaf patterns and may scorch the foliage, while too much shade can reduce vibrancy. Best placed near east- or west-facing windows, or a south-facing window with filtered light. Tolerates low to medium light but thrives in diffused brightness.',
Soil: 'Needs a slightly acidic, well-draining mix with good aeration. A blend of 2 parts Difficultwood soil, 1 part peat, and sand is ideal, with added charcoal to prevent root rot. Soil should remain moist but never soggy.',
  },{
    name: "Rattle Snake Plant",
    image: "CALATHEA RATTLESNAKE",
    plantId: 46,
  
    screen: "",
    description: 'The Rattlesnake Plant (Goeppertia insignis), also known as Calathea lancifolia, is a tropical evergreen perennial native to Brazil. A member of the Marantaceae family, it is prized for its long, lance-shaped leaves with wavy edges, dark green patterns resembling snake markings, and deep purple undersides. When grown indoors, it typically reaches up to 20 inches (50 cm) tall. Though it can be somewhat demanding in cooler or drier climates, this striking foliage plant rewards attentive care with an exotic, jungle-like charm.',

      care: {
       waterThreshold: 2,      // how much water per day is safe
    lightThreshold: 7,      // max safe sunlight
    fertilizerThreshold: 1, // max fertilizer per day
    waterFrequency: 4,       // can water every 1 day
    fertilizerFrequency: 30,  // can fertilize every 1 day
    lightFrequency: 1       // optional (every day is fine)
  },
    CareDifficulty: 'Easy',
Watering: 'Water frequently during the growing season to keep the soil consistently moist, but never waterlogged. Mist the leaves, place the pot on a tray of wet pebbles, or use a humidifier to maintain high humidity. Water every few days in summer, and adjust in cooler months to prevent overwatering.',
Lighting: 'Thrives in bright, indirect light or filtered sunlight. Avoid intense afternoon sun, which can scorch the leaves. Northern or eastern-facing windows are ideal, or diffuse stronger light with curtains. Early morning or dappled light is best.',
Soil: 'Prefers a well-draining, moisture-retentive mix. A combination of 2 parts peat moss and 1 part perlite provides the right balance. Slightly acidic to neutral soils are best, while alkaline soil should be avoided.',
  },{
    name: "ti Plant",
    image: "CORDYLINE FRUTICOSA",
    plantId: 47,
  
    screen: "",
    description: 'Ti Plant (Cordyline fruticosa), also known as Ti Leaf, is a tropical evergreen shrub native to Southeast Asia, Australia, and the Pacific Islands, including Hawaii. It is admired for its bold, colorful, palm-like leaves that range from green and red to purple, black, and pink. Outdoors, it can grow 3–12 ft (1–4 m) tall, while indoors it typically reaches 3–6 ft (1–2 m). In summer, mature plants may produce small, star-shaped pink or white flowers. This fast-growing, ornamental foliage plant is a popular choice both in tropical landscapes and as a striking indoor houseplant.',

      care: {
       waterThreshold: 1,      // how much water per day is safe
    lightThreshold: 7,      // max safe sunlight
    fertilizerThreshold: 1, // max fertilizer per day
    waterFrequency: 5,       // can water every 1 day
    fertilizerFrequency: 30,  // can fertilize every 1 day
    lightFrequency: 1       // optional (every day is fine)
  },
   CareDifficulty: 'Easy',
Watering: 'Thrives with consistently moist soil but requires good drainage to prevent root rot. Maintain even moisture throughout the growing season. Avoid letting the soil dry out completely.',
Lighting: 'Prefers bright, indirect light or partial shade. Full sun enhances leaf color, but hot, direct sunlight can cause leaf tip burn. Indoors, place in a well-lit area away from harsh rays.',
Soil: 'Grows best in fertile, well-draining, slightly acidic soil. Sandy or loamy soil enriched with organic matter works well. Mulching helps retain moisture but should not touch the trunk base.',
  },{
    name: "Frosty Fern",
    image: "SELAGINELLA KRAUSSIANA",
    plantId: 48,
  
    screen: "",
    description: 'Frosty Fern (Selaginella kraussiana), also known by many names including African Clubmoss, Cushion Moss, Krauss Spikemoss, and Moss Fern, is a tropical perennial native to Africa and the Azores. Despite its name, it is not a true fern but a spikemoss with vascular roots and the ability to sprout roots along its stems. It is admired for its dense, mat-forming growth and festive appearance, making it a popular choice for terrariums, dish gardens, or as seasonal holiday décor. Typically, it grows up to 2 inches (5 cm) tall, spreading into lush green clumps with arching stems.',

      care: {
       waterThreshold: 2,      // how much water per day is safe
    lightThreshold: 7,      // max safe sunlight
    fertilizerThreshold: 1, // max fertilizer per day
    waterFrequency: 3,       // can water every 1 day
    fertilizerFrequency: 330,  // can fertilize every 1 day
    lightFrequency: 1       // optional (every day is fine)
  },
    CareDifficulty: 'Difficult',
Watering: 'This moisture-loving plant requires consistently damp soil to thrive. Water regularly with room-temperature water, as cold water may damage the roots. While it tolerates brief periods of dryness, prolonged dry soil will cause stress. Keep humidity high for best results.',
Lighting: 'Prefers low to medium indirect light, replicating its natural shady forest floor habitat. Direct sunlight can scorch its delicate fronds. Outdoors, it should be kept in full shade. Indoors, place in a low-light spot away from harsh rays.',
Soil: 'Thrives in moist, well-draining, organic-rich soil with a slightly acidic pH (around 5.5–6). A standard houseplant mix with peat moss or coconut coir is ideal. Avoid dense outdoor soils or clay-heavy mixes that trap water and restrict oxygen to the roots.',
  },{
    name: "Ponytail Palm",
    image: "PONYTAIL PALM",
    plantId: 49,
  
    screen: "",
    description: 'Ponytail Palm (Beaucarnea recurvata), also called Elephant Foot Tree or Bottle Palm, is a unique succulent native to the semi-desert regions of Mexico. Despite its name, it is not a true palm but a member of the asparagus family and related to agaves and yuccas. Recognized by its swollen base that resembles an elephants foot, it features a slender trunk topped with cascading, narrow green leaves that arch gracefully like a ponytail. As a houseplant, it typically grows up to 6 ft (1.8 m) tall, while outdoors in its native habitat, it can reach 30 ft (9 m). Slow-growing and low-maintenance, the Ponytail Palm is a striking architectural plant that thrives on neglect, making it a popular choice for both beginners and seasoned plant lovers.',

      care: {
       waterThreshold: 1,      // how much water per day is safe
    lightThreshold: 7,      // max safe sunlight
    fertilizerThreshold: 1, // max fertilizer per day
    waterFrequency: 10,       // can water every 1 day
    fertilizerFrequency: 60,  // can fertilize every 1 day
    lightFrequency: 1       // optional (every day is fine)
  },
  CareDifficulty: 'Easy',
Watering: 'Requires very little water thanks to its bulbous trunk, which stores moisture. Water deeply but infrequently, allowing the top 2–3 inches (5–7 cm) of soil to dry out before watering again. Overwatering is the most common cause of problems. In the growing season, water every 7–14 days.',
Lighting: 'Thrives in full sun to bright indirect light. Indoors, place in the brightest spot possible, ideally near a south-facing window. Outdoors, it enjoys direct sunlight but can adapt to partial shade. Supplemental grow lights may be needed in low-light homes.',
Soil: 'Prefers sandy, well-draining soil similar to cactus or succulent mixes. A blend of cactus soil with added peat for richness works well. Loam soils with good drainage are also suitable. Avoid heavy or water-retentive soil, as the plant is highly sensitive to excess moisture.',
  },{
    name: "Norfolk Island Pine",
    image: "NORFOLK ISLAND PINE",
    plantId: 50,
  
    screen: "",
    description: 'Norfolk Island Pine (Araucaria heterophylla), often called Star Pine or Norfolk Pine, is a symmetrical evergreen native to Norfolk Island in Australia. Despite its name, it is not a true pine but belongs to the Araucariaceae family. Outdoors in its native habitat, it can soar up to 200 ft (60 m), but indoors as a houseplant, it typically grows 6–10 ft (1.8–3 m) tall. With its soft, touchable foliage and graceful whorled branches, it is commonly used as a decorative plant and even as a living Christmas tree. Non-toxic but not edible, ingestion may cause stomach upset in children or pets.',

      care: {
       waterThreshold: 1,      // how much water per day is safe
    lightThreshold: 7 ,      // max safe sunlight
    fertilizerThreshold: 1, // max fertilizer per day
    waterFrequency: 7,       // can water every 1 day
    fertilizerFrequency: 45,  // can fertilize every 1 day
    lightFrequency: 1       // optional (every day is fine)
  },
  CareDifficulty: 'Moderate',
Watering: 'Keep soil evenly moist but never soggy. Water every 1–2 weeks, allowing the top inch (2.5 cm) of soil to dry out between waterings. Overwatering is the most common cause of decline, so avoid letting the roots sit in excess moisture. In its natural rainforest habitat, this plant enjoys consistent dampness without waterlogging.',
Lighting: 'Prefers bright, indirect light to full sun. A south-facing window is ideal, providing 6–8 hours of filtered sunlight daily. It tolerates lower light conditions for extended periods but thrives best with steady brightness. Avoid all-day harsh sun exposure.',
Soil: 'Best grown in a well-draining, porous, sandy mix with slight acidity. A blend of standard potting soil enriched with peat moss and sand works well. Lightweight soils with organic matter, such as humus or compost, help maintain proper moisture balance.',
  },{
    name: "Asparagus Fern",
    image: "ASPARAGUS FERN",
    plantId: 51,
  
    screen: "",
    description: 'Asparagus Fern (Asparagus densiflorus), a member of the Asparagaceae family, is a fast-growing evergreen plant native to eastern and southern Africa. Despite its name, it is not a true fern but is recognized for its feathery, needle-like foliage that grows in clumps. Popular varieties include Foxtail, Plumosa, Ming, and Sprengeri. Its bright green, airy leaves make it a favorite for both indoor décor and hanging planters. Easy to grow and adaptable, it thrives with humidity, warmth, and regular care, adding a lush tropical touch to homes and gardens.',

      care: {
       waterThreshold: 2,      // how much water per day is safe
    lightThreshold: 7,      // max safe sunlight
    fertilizerThreshold: 1, // max fertilizer per day
    waterFrequency: 4,       // can water every 1 day
    fertilizerFrequency: 30,  // can fertilize every 1 day
    lightFrequency: 1       // optional (every day is fine)
  },
   CareDifficulty: 'Easy',
Watering: 'Prefers consistent moisture and high humidity. Water deeply once the top 2–3 inches (5–7 cm) of soil feels dry, allowing excess water to drain. Empty the saucer after watering to prevent root rot. Suggested schedule is 1–2 times per week. Once established, it can tolerate short dry spells but thrives best with regular watering and misting.',
Lighting: 'Grows best in bright, indirect light or dappled shade. Can adapt to more light if acclimated, but avoid harsh direct sun, which scorches foliage. Too much shade may cause leaves to yellow or drop. Indoors, place near an east-facing window for soft morning light, or a few feet away from a south- or west-facing window with filtered light.',
Soil: 'Requires moist, well-draining, and organically rich soil. A good mix is standard potting soil combined with extra perlite for aeration. Loamy soil (40% sand, 40% silt, 20% clay) also works well. Slightly acidic soil (pH 6.5–6.8) is ideal. Always ensure containers have drainage holes.',
  },{
    name: "Fire Lily",
    image: "CLIVIA MINIATA",
    plantId: 52,
  
    screen: "",
    description: 'The Fire Lily (Clivia miniata), also commonly called Kaffir Lily, Natal Lily, Flame Lily, Bush Lily, or simply Clivia, is a broadleaf evergreen perennial from the Amaryllidaceae family. Native to South Africa and Eswatini, it grows in clumping form with dark green, strap-like leaves. Each mature plant produces striking clusters of 12–20 funnel-shaped flowers in vivid scarlet-orange with yellow throats, often compared to amaryllis blooms but slightly smaller. Mature plants reach 2–3 ft (60–90 cm) in height and spread, with an elegant, arching silhouette. When pollinated, they produce bright red berries. Despite its exotic, tropical look, this plant is surprisingly easy to care for, making it a favorite both indoors and outdoors. Note: All parts of the Fire Lily are toxic to pets if ingested.', 

      care: { waterFrequency: 7, lightFrequency: 1, fertilizerFrequency: 45, waterThreshold: 1, lightThreshold: 7, fertilizerThreshold: 1 
  },
    CareDifficulty: 'Easy',
Watering: 'Water moderately, allowing the soil to dry between waterings. During the growing season, keep soil slightly moist, watering about once a week. In early winter dormancy, reduce watering so the soil is just short of bone-dry. This dry rest period encourages spring flowering.',
Lighting: 'Prefers bright, indirect sunlight but also adapts well to partial shade. Indoors, place away from harsh south-facing windows. A bright window with filtered light is ideal for year-round growth.',
Soil: 'Needs fertile, well-draining soil with good aeration. A chunky orchid-style mix with shredded bark works well, or a sandy cactus mix. A blend containing about 50% peat is also suitable. Always ensure proper drainage to avoid root rot.',
  },{
    name: "Episca Cupreata",
    image: "EPISCIA CUPREATA",
    plantId: 53,
  
    screen: "",
    description: 'Flame Violet (Episcia cupreata), also called Flame African Violet or Copper Leaf Violet, is a tropical perennial from the Gesneriaceae family and a close relative of the African Violet. Native to Venezuela, Brazil, and Colombia, it is admired for its striking rosettes of 2–3 in (5–8 cm) leaves that shimmer with shades of green, copper, brown, lavender, or pink, often accented by silver or light green veins. Its vining growth habit allows it to trail up to 4 ft (1.2 m), making it perfect for hanging baskets, shelves, or trellises.',

      care: { waterFrequency: 4, lightFrequency: 1, fertilizerFrequency: 45, waterThreshold: 2, lightThreshold: 7, fertilizerThreshold: 1
  },
  CareDifficulty: 'Moderate',
Watering: 'Keep soil slightly moist but not soggy. Check every other day and water thoroughly when the top feels dry, allowing excess water to drain. Empty saucers after watering to prevent root rot. Always use room-temperature water, as the roots are cold-sensitive and leaves may develop yellow spots if stressed.',
Lighting: 'Thrives in bright, indirect light. Too little light reduces blooming, while harsh direct sun can scorch leaves. Best placed near an east- or west-facing window, or under artificial grow lights for at least 8 hours daily. Sufficient light encourages continuous flowering.',
Soil: 'Prefers a light, airy, and fast-draining soil. A peat-moss based African violet mix with added perlite works best. You can also amend regular potting soil with bark or horticultural charcoal to improve aeration and drainage.',
  },{
    name: "Streptocaprus",
    image: "STREPTOCARPUS",
    plantId: 54,
  
    screen: "",
    description: 'Cape Primrose (Streptocarpus), also known simply as Streps or Streptocarpus, is a herbaceous perennial in the Gesneriaceae family and a close relative of African Violets. Native to regions across Africa, the Gulf of Guinea, parts of South America, and even Asia and Australia, it thrives in warm, moist climates. Indoors, it remains compact, reaching about 8 in (20 cm) tall and 12 in (30 cm) wide, with velvety leaves up to 6 in (15 cm) long. Non-toxic to pets, Cape Primrose is an excellent choice for brightening homes with orchid-like blooms and easy care requirements.',

      care: { waterFrequency: 4, lightFrequency: 1, fertilizerFrequency: 45, waterThreshold: 2, lightThreshold: 7, fertilizerThreshold: 1
  },
   CareDifficulty: 'Easy',
Watering: 'Water thoroughly, then allow the soil to dry slightly before watering again. Cape Primrose is sensitive to both dryness and soggy soil, so aim for balanced moisture. Like African Violets, it prefers evenly damp conditions without being waterlogged.',
Lighting:'Prefers bright to moderate indirect light and should be kept out of direct afternoon sun, which can scorch the leaves. While bright, filtered light is ideal, Cape Primrose can also tolerate lower-light environments, making it versatile for indoor growing.',
Soil: 'Use a well-draining, organic potting mix without added moisture-control products, as these hold excess water. An enriched potting mix with perlite works best to provide both fertility and proper aeration.',
  },{
    name: "Echeveria",
    image: "ECHEVERIA",
    plantId: 55,
  
    screen: "",
    description: 'Echeveria (Echeveria), commonly called Mexican Hens and Chicks, Ghost Echeveria, or Painted Lady (depending on the variety), is a popular succulent genus in the Crassulaceae family. Native to Central America, South America, and Mexico, these plants grow in rosettes of fleshy leaves that store water. Most remain compact, about 1 ft (30 cm) wide, though some species can grow into shrub-like forms reaching 2 ft (60 cm) tall. With their striking colors, geometric rosettes, and minimal care needs, echeverias are favorites for houseplants, succulent gardens, and container displays.',

      care: { waterFrequency: 10, lightFrequency: 1, fertilizerFrequency: 60, waterThreshold: 1, lightThreshold: 7, fertilizerThreshold: 1 
  },
   CareDifficulty: 'Moderate',
Watering: 'Water sparingly, allowing the soil to dry out completely between waterings. Give the plant a deep soak, letting excess water drain out of the pot, and discard any standing water in saucers. In the growing season, water about every 7–10 days (½ to 1 cup depending on plant size). It is better to underwater than to overwater, as echeverias are prone to root rot.',
Lighting: 'Requires plenty of direct sunlight to thrive—at least 4–6 hours daily. A bright, sunny windowsill or outdoor spot is ideal for healthy growth and vibrant color.',
Soil: 'Needs a well-draining, porous mix such as standard cactus potting soil. A homemade blend of 3 parts potting soil, 2 parts coarse sand, and 1 part perlite works well. Soil should be slightly acidic (around pH 6.0).',
  },{
    name: "Donkey's Tale",
    image: "SEDUM MORGANIANUM",
    plantId: 56,
  
    screen: "",
    description: 'Donkeys Tail (Sedum morganianum), also known as Burros Tail, Horses Tail, or Lambs Tail, is a tender trailing succulent native to southern Mexico and Honduras. Belonging to the Crassulaceae family, it forms long pendulous stems up to 4 ft (1.2 m) long, densely covered with fleshy, tear-drop-shaped blue-green leaves. Mature plants may produce pink to red star-shaped flowers in summer, adding to their ornamental appeal. Popular as a houseplant for hanging baskets and containers, Donkeys Tail is slow-growing but long-lived, thriving in dry, arid conditions. Although safe for people and pets in most sources, some reports note mild toxicity, so its best to keep it out of reach of children and animals.',

       care: { waterFrequency: 10, lightFrequency: 1, fertilizerFrequency: 60, waterThreshold: 1, lightThreshold: 7, fertilizerThreshold: 1
  },
   CareDifficulty: 'Easy',
Watering: 'Water sparingly, letting the soil dry out completely between waterings. During spring and summer, water once every 2–3 weeks, and in winter reduce to once or twice a month, only moistening the topsoil. Signs of underwatering include wrinkled or puckered leaves, while overwatering can cause leaf drop and root rot. Always use pots with drainage holes, ideally terracotta, to avoid excess moisture.',
Lighting: 'Thrives in bright, direct light but tolerates partial shade. Indoors, place near a sunny south- or southeast-facing window for several hours of daily light. Insufficient light can cause stretching and leaf drop.',
Soil: 'Requires well-draining, sandy soil. Use a cactus or succulent potting mix, or make your own with garden soil, coarse river sand, and perlite or expanded clay. Ensure the container has drainage holes to prevent root rot. Soil pH can range from neutral to alkaline.',
  },{
    name: "Mistletoe Cactus",
    image: "RHIPSALIS",
    plantId: 57,
  
    screen: "",
    description: 'Mistletoe Cactus (Rhipsalis), also called Chain Cactus, Spaghetti Cactus, or Jungle Cactus, is a trailing epiphytic succulent in the cactus family (Cactaceae). Native to tropical and subtropical regions of Central and South America, Africa, Madagascar, and even Florida (where it is endangered), this unusual cactus thrives in rainforests where it grows on trees. Unlike desert cacti, Rhipsalis has thin, cylindrical stems that branch and trail, forming cascading webs that can reach up to 6 ft (1.8 m) long and 2 ft (60 cm) wide. Its soft, pendant stems give it a unique appearance in hanging baskets or containers. Rhipsalis is moisture-loving, easy to grow indoors, and adds a striking tropical look to homes.',

      care: { waterFrequency: 10, lightFrequency: 1, fertilizerFrequency: 60, waterThreshold: 1, lightThreshold: 7, fertilizerThreshold: 1
  },
  CareDifficulty: 'Easy',
Watering: 'Water regularly to keep the soil slightly moist, but avoid overwatering. Unlike most cacti, Rhipsalis prefers more frequent watering and should not be allowed to dry out completely. Let the top 1–2 inches of soil dry before watering again, and always use a well-draining pot to prevent root rot. Filtered or settled water is recommended.',
Lighting: 'Thrives in bright, indirect light. It is sensitive to direct sun, which can scorch the stems, but will also tolerate medium to low light conditions with slower growth. Ideal placement is near a window with filtered light or light shade during hot seasons.',
Soil: 'Prefers a rich, airy, and well-draining mix that retains some moisture. A blend of one part potting soil, one part orchid bark, and one part perlite works well. Slightly acidic soil is ideal. Ensure containers have good drainage to avoid waterlogging.',
  },{
    name: "String of Bananas",
    image: "STRING OF BANANAS",
    plantId: 58,
  
    screen: "",
    description: 'String of Bananas (Curio radicans), also known as Banana Vine or Necklace Plant, is a trailing succulent native to South Africa. Related to the popular String of Pearls, this plant forms cascading vines with glossy, banana-shaped leaves that store water. Indoors, its tendrils can reach up to 6 ft (1.8 m), making it ideal for hanging baskets and vertical gardens.',

      care: { waterFrequency: 10, lightFrequency: 1, fertilizerFrequency: 60, waterThreshold: 1, lightThreshold: 7, fertilizerThreshold: 1
  },
   CareDifficulty: 'Moderate',
Watering: 'Water every 2–3 weeks, allowing the soil to dry out completely between waterings. Always water thoroughly so the entire root system is moistened, then let excess water drain. Avoid leaving the plant in soggy soil or standing water, as this leads to root rot. Bottom watering can help prevent overwatering. Inactive periods require less frequent watering.',
Lighting: 'Requires bright, direct light for at least 5–6 hours daily. Indoors, place near a sunny south- or west-facing window, or supplement with grow lights. Outdoors, provide some partial shade to protect the leaves from scorching.',
Soil: 'Prefers a fast-draining succulent or cactus mix. A homemade blend of 2 parts potting soil, 1 part perlite, and 1 part pumice or coarse sand ensures proper aeration and drainage. Avoid moisture-retentive soil.',
  },{
    name: "Million Hearts",
    image: "DISCHIDIA RUSCIFOLIA",
    plantId: 59,
  
    screen: "",
    description: 'Million Hearts (Dischidia ruscifolia), native to the Philippines, is an evergreen, perennial epiphytic plant in the Apocynaceae family. It grows as dense clumps of trailing or climbing stems that can reach up to 3.3 ft (1 m) long. The stems are covered with pairs of tiny, stiff, succulent heart-shaped leaves that create the appearance of “chains of hearts,” giving the plant its name. Small white flowers often appear on the internodes and last for long periods.',

      are: { waterFrequency: 7, lightFrequency: 1, fertilizerFrequency: 45, waterThreshold: 1, lightThreshold: 7, fertilizerThreshold: 1
  },
   CareDifficulty: 'Moderate',
Watering: 'Water thoroughly when nearly all the soil has dried out. This species appreciates consistent moisture but does not tolerate being waterlogged. In summer, water regularly while allowing the soil to dry slightly between waterings. In winter, keep drier with good airflow to prevent rot.',
Lighting: 'Thrives in medium to bright indirect light. Avoid harsh midday sun, which can scorch the leaves. Variegated varieties require bright indirect light to maintain their coloring. In stronger light, the leaves may bronze, which often encourages flowering.',
Soil: 'Prefers a porous, well-draining potting medium that retains some moisture but allows airflow to the roots. A mix of peat, fibrous soil, and sand with perlite, pumice, or ceramic balls works well.',
  },{
    name: "Sweet Heart Hoya",
    image: "HOYA KERRII",
    plantId: 60,
  
    screen: "",
    description: 'Sweetheart Hoya (Hoya kerrii), also known by many names such as Valentine Hoya and Heart-Shaped Hoya, is an evergreen tropical climber in the Apocynaceae family. Native to Cambodia, Laos, Vietnam, Malaysia, Thailand, and Java (Indonesia), as well as southern China, it is easily recognized by its thick, heart-shaped leaves, which make it a popular gift plant. While often sold as a single rooted leaf in small pots, established vines can grow up to 13 ft (4 m) long, producing trailing tendrils that eventually sprout new leaves. With proper care, mature plants bloom with clusters of star-shaped white flowers with red centers, giving off a sweet fragrance. Related to milkweed, Hoya kerrii exudes a wax-like substance when cut, adding to its common name “wax plant.” It is Difficulty, long-lived, and a beloved ornamental for both beginners and collectors.',

      care: { waterFrequency: 7, lightFrequency: 1, fertilizerFrequency: 45, waterThreshold: 1, lightThreshold: 7, fertilizerThreshold: 1
  },
  CareDifficulty: 'Easy',
Watering: 'Allow the soil to dry thoroughly between waterings. Hoya kerrii has thick, water-storing leaves that make it drought-tolerant, but also highly susceptible to overwatering and root rot. Water about once a week during the growing season, and reduce in winter. Keep the soil slightly moist but never soggy.',
Lighting: 'Thrives in bright, indirect light, but can handle a few hours (2–4) of direct morning or late afternoon sun. Avoid harsh midday sun, which can scorch the leaves. A west- or south-facing window is ideal. In low-light environments, supplement with a full-spectrum LED grow light.',
Soil: 'As an epiphyte, Hoya kerrii requires a loose, airy, and well-draining soil mix. A blend of potting soil, perlite, orchid bark, and sand is recommended. Succulent or cactus soil mixes also work well as long as drainage is excellent. Avoid compacted, heavy soil.',
  },{
    name: "Lipstick PLant",
    image: "LIPSTICK PLANT",
    plantId: 61,
  
    screen: "",
    description: 'Lipstick Plant (Aeschynanthus radicans), commonly called Lipstick Vine, is an evergreen tropical epiphyte in the Gesneriaceae family, native to the rainforests of Southeast Asia, particularly Malaysia and surrounding islands. It produces cascading stems 12–36 in (30–90 cm) long, covered with glossy green leaves and striking clusters of tubular red flowers that resemble lipstick emerging from a case, giving the plant its common name. In nature, it grows on trees and rocks in bright but sheltered spots near waterfalls and riverbanks, pollinated by nectar-feeding birds. Popular as a trailing houseplant, it adds vibrant color and exotic beauty to indoor spaces.',

      care: { waterFrequency: 5, lightFrequency: 1, fertilizerFrequency: 45, waterThreshold: 1, lightThreshold: 7, fertilizerThreshold: 1
  },
  CareDifficulty: 'Moderate',
Watering: 'Keep soil evenly moist but not soggy. Water when the top 1–2 inches (2–5 cm) of soil feel dry. In spring and summer, water weekly; in cooler seasons, reduce to once every 2–3 weeks. Always allow excess water to drain and avoid leaving water in saucers. Moderate watering prevents leaf drop and root rot, while humidity—such as in a ventilated bathroom—helps mimic its tropical environment.',
Lighting: 'Thrives in bright, indirect light. Avoid harsh direct sunlight, which can scorch the leaves, as well as low light, which reduces flowering. East- or west-facing windows are ideal, while north-facing windows can work during summer.',
Soil: 'Prefers a light, well-aerated, and slightly acidic to neutral mix. Use one part potting soil, one part peat, and one part perlite, or amend with sand and sphagnum moss for extra drainage and absorbency. Avoid dense, heavy substrates that can lead to root rot.',
  },{
    name: "Goldfish Plant",
    image: "GOLDFISH PLANT",
    plantId: 62,
  
    screen: "",
    description: 'Goldfish Plant (Columnea gloriosa), also known as Flying Goldfish Plant or Dancing Dolphins is a tropical evergreen epiphyte native to Central and South America. It gets its name from its bright orange, tubular flowers that resemble tiny goldfish swimming among glossy, dark green leaves. Its vining stems can grow 2–3 in (5–7 cm) long per segment, while mature trailing branches may reach up to 3 ft (90 cm). When grown indoors with proper care, Goldfish Plant is fast-growing and can bloom year-round, often starting 6–10 weeks after planting. Popular as a hanging basket plant, it creates a striking display with cascading foliage and colorful blooms, making it a favorite among tropical houseplant collectors.',

      care: { waterFrequency: 5, lightFrequency: 1, fertilizerFrequency: 45, waterThreshold: 1, lightThreshold: 7, fertilizerThreshold: 1
  },
  CareDifficulty: 'Moderate',
Watering: 'In summer, water generously and keep the soil consistently moist, but never soggy. In winter, reduce watering and allow the soil to become slightly drier while avoiding complete dryness, as this can damage the plant. Overwatering causes root rot, while underwatering leads to stress and fewer blooms.',
Lighting: 'Prefers bright, indirect light for long periods—up to 10 hours a day. An east-facing window is ideal. Avoid harsh, direct sunlight, which can scorch the leaves, but provide enough brightness to encourage lush growth and continuous flowering.',
Soil: 'Requires a light, fast-draining soil mix. A standard African violet potting mix or a succulent mix with added perlite works well. The soil should retain some moisture but allow excess water to drain quickly.',
  },{
    name: "Philodendron Florida Beauty",
    image: "PHILODENDRON FLORIDA BEAUTY",
    plantId: 63,
  
    screen: "",
    description: 'Philodendron Florida Beauty (Philodendron ‘Florida Beauty’), also known as Florida Beauty Variegata, is a stunning hybrid from the Araceae family. This tropical climbing plant features large, deeply lobed leaves with striking green and creamy-yellow variegation, making it a prized ornamental among collectors. It grows as a vining plant with aerial roots that help it climb and attach to supports. Native to tropical regions, it thrives in warm, humid environments and adds a bold, exotic touch to any indoor space. Its elegant foliage and unique leaf shape make it one of the most sought-after Philodendron varieties for plant enthusiasts.',

      care: { waterFrequency: 7, lightFrequency: 1, fertilizerFrequency: 30, waterThreshold: 1, lightThreshold: 7, fertilizerThreshold: 1
  },
  CareDifficulty: 'Moderate',
Watering: 'Water regularly, but only enough to keep the soil slightly moist—never soggy. Philodendron Florida Beauty prefers consistent moisture, though it is sensitive to overwatering. Allow the top inch of soil to dry out before watering again. Typically, watering once or twice a week is sufficient, depending on the environment. Always ensure good drainage to prevent root rot, and avoid letting the plant sit in standing water.',
Lighting: 'Thrives in bright, indirect light. Too much direct sunlight can scorch the leaves, while too little light can cause leggy growth and fading variegation. Position near an east- or north-facing window for the best results. Filtered sunlight encourages healthy leaf color and growth.',
Soil: 'Use a rich, airy, and well-draining soil mix. A blend of peat moss, perlite, bark, and regular potting soil provides ideal aeration and moisture retention. The soil should stay slightly moist but never waterlogged. Repot every 1–2 years in spring to refresh the soil and allow root expansion.',
  },{
    name: "Fernleaf Phildendron",
    image: "PHILODENDRON TORTUM",
    plantId: 64,
  
    screen: "",
    description:  'Philodendron tortum, commonly known as Fernleaf Philodendron, is a rare and exotic climbing species from the rainforests of Central and South America, particularly the Reserva Florestal Ducke near Manaus, Brazil. Its deeply divided, narrow green leaves resemble fern fronds, giving it a delicate, sculptural appearance. The new leaves emerge with a striking copper-orange tint before maturing to deep green. As a climbing aroid, it produces aerial roots that attach to supports, allowing it to grow up to 6 feet (2 m) indoors when staked or given a moss pole. With its graceful texture and easy-care nature, the Fernleaf Philodendron brings a tropical, architectural beauty to any indoor plant collection.',

      care: { waterFrequency: 7, lightFrequency: 1, fertilizerFrequency: 30, waterThreshold: 1, lightThreshold: 7, fertilizerThreshold: 1
  },
  CareDifficulty: 'Easy',
Watering: 'Water when the top 2 inches (5 cm) of soil are dry. Philodendron tortum prefers evenly moist but not soggy soil. Overwatering can lead to root rot, so allow the top half of the soil to dry before watering again. Typically, watering once a week is sufficient, depending on humidity and temperature. Ensure the pot has proper drainage and avoid leaving excess water in the saucer. Maintain moderate humidity above 40% for optimal growth.',
Lighting: 'Prefers bright, indirect light or filtered sunlight. Direct sunlight can scorch the delicate leaves, while low light may slow its growth. Place near an east- or north-facing window where it can receive gentle morning sun. If natural light is insufficient, full-spectrum grow lights can help maintain healthy foliage.',
Soil: 'Use a rich, chunky, and well-draining soil mix. A combination of potting soil, perlite, vermiculite, coconut coir, and pine bark chips works best. The mix should hold some moisture but allow air circulation around the roots. Adding a moss pole encourages vertical growth and larger leaves.',
  },{
    name: "Black-Form Philodendron",
    image: "PHILODENDRON BLACK BILLIEITIEA",
    plantId: 65,
  
    screen: "",
    description: 'Philodendron billietiae ‘Black Form,’ commonly known as Black Billietiae Philodendron, is a rare and striking cultivar of the classic Philodendron billietiae. It features elongated, glossy, heart-shaped leaves that emerge in a deep green—almost black—shade, maturing into a rich dark green that contrasts beautifully with its vivid orange petioles. This tropical climbing plant thrives with structural support, such as a moss pole, to mimic its natural rainforest environment. Native to South America, this variety adds a bold and elegant touch to indoor plant collections. Like most philodendrons, it is toxic to pets if ingested, so keep it out of reach of animals.',

     care: { waterFrequency: 7, lightFrequency: 1, fertilizerFrequency: 30, waterThreshold: 1, lightThreshold: 7, fertilizerThreshold: 1
  },
  CareDifficulty: 'Easy',
Watering: 'Water thoroughly when the top 1–2 inches of soil feel dry. Philodendron billietiae enjoys consistent moisture but is sensitive to overwatering. Keep the soil slightly moist—never soggy—and allow excess water to drain freely. Ensure the pot has proper drainage holes to prevent root rot. An occasional shower helps clean the leaves and refresh the plant. Avoid letting it sit in standing water.',
Lighting: 'Thrives in bright, indirect light. In its natural habitat, this plant grows beneath the rainforest canopy, so filtered morning or late afternoon sunlight works best. Too much harsh, direct sunlight can scorch the leaves, while low light may slow growth and dull the leaf color. East- or west-facing windows are ideal.',
Soil: 'Use a rich, well-draining aroid mix that retains some moisture but allows airflow. A combination of indoor potting soil, perlite, and orchid bark or vermiculite is ideal. The soil should be moist yet never compacted to prevent root rot.',
  },{
    name: "Syngonium Aurea",
    image: "SYNGONIUM AUREA",
    plantId: 66,
  
    screen: "",
    description: 'Syngonium Aurea is a striking tropical vine admired for its vivid lime-to-golden variegation and arrow-shaped leaves. As the leaves mature, their green tones fade into vibrant yellow, giving the plant a radiant, sunlit appearance. This fast-growing climber loves to climb—so provide it with a moss pole or trellis for upward growth. Indoors, mature leaves can reach around 1 foot (30 cm) long, while in the wild, they may grow up to 2 feet (60 cm). Native to the tropical rainforests of Central and South America, this plant brings a touch of jungle charm indoors. With proper care, it’s a rewarding choice for collectors and beginners alike, offering lush, golden foliage year-round.',

      care: { waterFrequency: 5, lightFrequency: 1, fertilizerFrequency: 45, waterThreshold: 1, lightThreshold: 7, fertilizerThreshold: 1
  },
  CareDifficulty: 'Moderate',
Watering: 'Water your Syngonium Aurea when the top inch (2–3 cm) of soil feels dry to the touch. Soak the soil thoroughly until water drains from the bottom, but ensure the pot has proper drainage to prevent waterlogging. Avoid letting it sit in standing water to prevent root rot. The soil should stay consistently moist but not soggy. Too much water will cause yellowing and leaf drop, while underwatering results in brown, crispy leaf tips. A balance of moisture is key—this tropical plant enjoys humidity and regular watering, but hates “wet feet.”',
Lighting: 'Prefers bright, indirect light to maintain its stunning yellow-green variegation. Avoid direct sunlight, as it can scorch the leaves, particularly the lighter areas. Too little light can cause slower growth and fading color. An east-facing window is ideal, or use filtered light from sheer curtains. In low-light settings, supplement with a grow light to keep the variegation vibrant.',
Soil: 'Thrives in a rich, airy, and well-draining soil mix that allows roots to breathe. A blend of 1/3 orchid bark, 1/3 perlite, and 1/3 compost works beautifully. You can also mix peat moss, perlite, and potting soil to promote moisture balance and healthy root growth. Avoid compact, heavy soil. Adding charcoal or worm castings boosts nutrients and keeps the mix fresh.',
  },{
    name: "Golden Violin Philodendron",
    image: "PHILODENDRON GOLDEN VIOLIN",
    plantId: 67,
  
    screen: "",
    description: 'The Golden Violin Philodendron (Philodendron bipennifolium ‘Aurea’) is a dazzling tropical climber known for its neon-yellow, violin-shaped leaves that deepen into bright chartreuse as they mature. Its distinctive leaf shape evolves with age—juvenile leaves appear smooth and rounded, while mature foliage grows elongated and dramatically lobed, reaching over 18 inches (45 cm) in length. Native to the rainforests of South America—including Brazil, Ecuador, French Guiana, and Peru—this rare cultivar of the classic Philodendron bipennifolium adds a vibrant, sculptural touch to any indoor space. With the right care and light, it glows with golden tones that make it an instant statement plant for collectors and enthusiasts alike.',

      care: { waterFrequency: 7, lightFrequency: 1, fertilizerFrequency: 30, waterThreshold: 1, lightThreshold: 7, fertilizerThreshold: 1,
  },
   CareDifficulty: 'Moderate',
Watering: 'Allow the soil to dry about two-thirds of the way between waterings. Keep the soil slightly moist but never soggy—overwatering can lead to root rot, while prolonged dryness can cause the leaves to wilt or curl. Water when the top 1–2 inches (2.5–5 cm) of soil feel dry to the touch, ensuring any excess water drains freely from the pot. Consistent moisture without saturation is key to keeping your Golden Violin healthy and vibrant.',
Lighting: 'Thrives in medium to bright indirect light. Place it in a location with several hours of filtered sunlight each day, such as near an east- or north-facing window. Avoid direct sunlight, which can burn or yellow the leaves. Insufficient light can dull the golden hue of new growth, so ensure it gets bright but gentle light to maintain its color and vigor.',
Soil: 'Use a rich, well-draining soil mix that balances moisture retention and aeration. A mixture of indoor potting soil, perlite, and orchid bark works perfectly. The soil should allow excess water to flow through easily, preventing saturation while keeping roots oxygenated. Avoid compact or dense soil, which can trap moisture and suffocate roots.',
  },{
    name: "Hilo Beauty Caladium",
    image: "HILO BEAUTY CALADIUM",
    plantId: 68,
  
    screen: "",
    description: 'The Hilo Beauty Caladium (Caladium praetermissum ‘Hilo Beauty’)—often mislabeled as Alocasia Hilo Beauty—is a stunning tropical foliage plant native to South America and known only from cultivation. Its large, heart-shaped leaves feature an eye-catching camouflage pattern of lime green, cream, and dark green, set against thick, bluish-black stems. This bold patterning gives it a unique, exotic charm perfect for bright indoor spaces or shaded outdoor areas. Thriving in warm, humid conditions, this plant adds a splash of drama and color wherever it’s placed. Despite its tropical origins, it’s surprisingly easy to grow with proper moisture and indirect light, making it a popular choice for both new and seasoned plant enthusiasts.',

      care: { waterFrequency: 4, lightFrequency: 1, fertilizerFrequency: 30, waterThreshold: 2, lightThreshold: 7, fertilizerThreshold: 1
  },
  CareDifficulty: 'Moderate',
Watering: 'Keep the soil consistently moist but not soggy. Water thoroughly whenever the top inch of soil begins to feel dry, allowing excess water to drain away. In warmer months or dry conditions, daily or frequent light watering may be necessary, especially for potted plants. Avoid letting the soil dry out completely, as this can cause the leaves to wilt or become crispy. Maintaining consistent moisture is essential to keep this tropical plant lush and healthy.',
Lighting: 'Prefers bright, indirect light. Caladium Hilo Beauty thrives in partially shaded areas, making it ideal for low-light indoor corners or shaded outdoor gardens. In southern climates, grow it in full to partial shade; in northern regions, it can tolerate more sunlight as long as the soil remains moist and the foliage is protected from harsh afternoon rays. Too much direct sunlight may scorch the leaves, while insufficient light can dull its vivid variegation.',
Soil: 'Use a rich, well-draining soil that retains moisture without becoming waterlogged. A mix of peat moss, perlite, and potting soil provides the right balance of aeration and water retention. The soil should be slightly acidic, with a pH between 5.5 and 6.5. For garden planting, ensure the soil is equally rich and loose to prevent the tubers from rotting in standing water.',
  },{
    name: "Pink Arrowhead Plant",
    image: "PINK SYNGONIUM",
    plantId: 69,
  
    screen: "",
    description: 'The Pink Arrowhead Plant (Syngonium podophyllum ‘Pink Allusion’) is a charming, tropical evergreen native to the rainforests of Mexico, Central America, and parts of South America including Brazil, Venezuela, and Peru. Known for its striking pink, arrow-shaped leaves with soft green edges, this semi-tropical beauty adds a pop of color and texture to any indoor plant collection. Over time, it develops climbing or trailing vines, making it perfect for hanging baskets or trained on a support. Although easy to grow and low-maintenance, it is important to note that Syngonium is not pet-safe if ingested.',

      care: { waterFrequency: 5, lightFrequency: 1, fertilizerFrequency: 30, waterThreshold: 1, lightThreshold: 7, fertilizerThreshold: 1
  },
   CareDifficulty: 'Easy',
Watering: 'Water thoroughly and allow the top inch of soil to dry out before watering again. Ensure the pot has proper drainage to prevent standing water and root rot. The plant prefers evenly moist soil—never soggy or completely dry. During warmer months, increase watering frequency slightly to maintain light soil moisture.',
Lighting: 'Thrives in medium to bright indirect light, especially the pink varieties that need good light to maintain their vibrant color. Avoid harsh direct sunlight, which can scorch the delicate leaves. An east-facing window that receives gentle morning sun is ideal, or a bright spot that offers 2–3 hours of filtered sunlight daily. Low-light areas may cause the pink hues to fade.',
Soil: 'Use a well-draining but moisture-retentive soil mix. Amend standard potting soil with perlite, coco coir, or orchid bark to increase aeration and drainage. The soil should stay lightly moist but never compact or waterlogged.',
  },{
    name: "Jelly Plant",
    image: "PEPEROMIA JELLY",
    plantId: 70,
  
    screen: "",
    description: 'Native to South America, the Jelly Plant (Peperomia clusiifolia ‘Jelly’) is a charming, compact succulent-like perennial known for its striking variegated foliage with shades of green, cream, and pinkish-red edges. Its fleshy leaves help retain water, making it resilient to mild neglect and perfect for beginner plant enthusiasts. This non-toxic plant is safe for homes with pets and children, making it a colorful and worry-free addition to any indoor plant collection.',

      care: { waterFrequency: 7, lightFrequency: 1, fertilizerFrequency: 45, waterThreshold: 1, lightThreshold: 7, fertilizerThreshold: 1
  },
  CareDifficulty: 'Easy',
Watering: 'Water when the top 1–2 inches of soil feel dry. Ensure thorough watering until excess drains from the bottom of the pot, but never let water accumulate in the soil. Overwatering can cause root rot. Peperomia Jelly tolerates occasional missed waterings thanks to its succulent-like leaves that store moisture. If kept outdoors, around 1 inch of rain per week is sufficient.',
Lighting: 'Thrives in bright, indirect light. The brighter the light, the redder and more vibrant the leaf edges become. Avoid harsh direct sunlight, which may scorch the leaves. Place near a south- or east-facing window within 3 feet for best growth. Low light can lead to duller coloration and slower growth.',
Soil: 'Prefers a well-draining, airy potting mix to prevent soggy roots. A peat-based or succulent mix with added perlite works best. Ensure the pot has good drainage holes to avoid standing water.',
  },{
    name: "Brazillian Wild Form",
    image: "ANTHRIUM RADICANS",
    plantId: 71,
  
    screen: "",
    description: 'Anthurium radicans (Brazilian Wild Form) is a striking tropical species admired for its thick, deeply corrugated, and glossy heart-shaped leaves. Native to Southeastern Brazil and parts of Ecuador, this resilient plant is known for its toughness and adaptability compared to many high-elevation Anthuriums. While other corrugated-leaf species struggle in warm conditions, A. radicans thrives as a low, ground-crawling variety that’s easier to maintain. Its lush foliage and exotic texture make it a prized addition to any plant collection, combining tropical beauty with moderate care requirements.',

      care: { waterFrequency: 7, lightFrequency: 1, fertilizerFrequency: 30, waterThreshold: 1, lightThreshold: 7, fertilizerThreshold: 1
  },
   CareDifficulty: 'Moderate',
Watering: 'Water your Anthurium Radicans regularly, but avoid overwatering. Only water when the top 1–2 inches (about 5 cm) of the soil feels dry. The plant is prone to root rot if left in soggy soil, so ensure proper drainage. In hot climates, water every 2–3 days to maintain consistent moisture. Underwatering can cause the leaves’ edges to brown or crisp, so aim for a balanced watering routine that keeps the soil slightly moist but never soaked.',
Lighting: 'Prefers bright, indirect, or filtered sunlight (70–85% light exposure). Direct sun can scorch its delicate leaves, while low light slows its growth. Outdoors, it thrives in partial shade; indoors, place it near a window with bright, filtered light.',
Soil: 'Anthurium Radicans thrives in a rich, well-draining, and airy soil mix. Combine equal parts potting soil, orchid mix, and perlite to achieve the ideal balance of moisture and aeration. Avoid overly wet, mucky, or sandy soils. The mix should stay lightly moist but allow excess water to drain freely to prevent root rot.',
  },{
    name: "Syngonium Variegated Chiapanse",
    image: "SYNGONIUM VARIEGATED CHIAPENSE",
    plantId: 72,
  
    screen: "",
    description: 'Syngonium chiapense "Variegata" is a striking and easy-to-grow tropical aroid native to Central America. This special variegated form is admired for its mature, round, heart-shaped leaves that are a rich green with creamy white or pale yellow variegation, creating a beautiful marbled contrast. The leaves have a smooth, rubbery texture and can grow quite large in the right conditions. As a natural climber or trailing plant, it adapts well to both pots and hanging planters. Its tolerance for varied light and humidity levels makes it an excellent choice for both beginner and seasoned plant collectors.',

      care: { waterFrequency: 5, lightFrequency: 1, fertilizerFrequency: 45, waterThreshold: 1, lightThreshold: 7, fertilizerThreshold: 1
  },
  CareDifficulty: 'Easy',
Watering: 'Water when the top 1–2 inches (3–5 cm) of soil feel dry to the touch. Avoid overwatering and always ensure your pot has drainage holes to prevent water stagnation. Depending on the season and lighting conditions, watering may be needed roughly once every 5–10 days. On average, it requires about 0.8 cups of water every 9 days when grown in a 5.0" pot without direct sunlight. Keep the soil moderately moist, but never soggy — consistency is key for healthy growth.',
Lighting: 'Thrives best in bright, indirect light. Ideal locations include east- or north-facing windows, or near south- or west-facing ones with filtered light through sheer curtains to prevent leaf burn. It can tolerate low-light conditions but shows its best variegation in moderate to bright indirect light. For best growth, place it within 6 feet of a bright window, avoiding harsh, direct sun. Perfect for indoor environments with strong but diffused light.',
Soil: 'Prefers a rich, organic, and well-draining soil mix. A blend of potting soil, perlite, and peat moss works well to maintain moisture while allowing excess water to drain freely. This ensures the roots remain healthy and aerated, promoting steady growth and lush foliage.',
  },{
    name: "Philodenrdron Birkins",
    image: "PHILODENDRON BIRKINS",
    plantId: 73,
  
    screen: "",
    description: 'Philodendron ‘Birkin’ is a highly ornamental foliage plant prized for its glossy, dark green leaves streaked with creamy-white or yellow pinstripes. Each leaf displays a unique variegation pattern, which becomes more pronounced as the plant matures. Compact and self-supporting, it can reach up to 3 feet tall and wide, with thick, upright stems and lush growth. Though it may produce small spadix-type flowers, its elegant, striped leaves are the true showpiece. Native to tropical regions of the Americas and the Caribbean, the Philodendron Birkin makes a statement as an easy-care indoor centerpiece for plant enthusiasts and beginners alike.',

      care: { waterFrequency: 7, lightFrequency: 1, fertilizerFrequency: 45, waterThreshold: 1, lightThreshold: 7, fertilizerThreshold: 1
  },
  CareDifficulty: 'Easy',
Watering: 'Water your Philodendron Birkin when the top 1–2 inches of soil feel dry to the touch. This plant prefers evenly moist soil but is prone to root rot if overwatered, so always allow the soil to partially dry between waterings. Soggy soil can lead to mushy stems and dying roots. Water thoroughly once or twice a week, depending on humidity and temperature. If unsure, use a moisture meter to gauge dryness. While it dislikes prolonged drought, it’s forgiving and will bounce back quickly after a missed watering.',
Lighting: 'Philodendron Birkin thrives in medium to bright, indirect light. A spot near an east- or west-facing window is ideal, where it can receive gentle, filtered sunlight. Avoid direct sun exposure, as it may scorch the leaves. Too little light can reduce variegation, leading to more solid green leaves. Consistent indirect brightness helps maintain its striking creamy-white pinstriping.',
Soil: 'Use a well-draining, rich potting mix suitable for tropical plants. A blend of one part potting soil, one part orchid bark, and one part perlite works perfectly — this provides good aeration, moisture retention, and drainage. The soil should be slightly acidic to neutral (pH around 6.0–6.5). Avoid dense, compact soils that trap excess moisture.',
  },{
    name: "Red Secret",
    image: "ALOCASIA CUPREA",
    plantId: 74,
  
    screen: "",
    description: 'Alocasia cuprea, commonly known as Red Secret, Elephant Ears, or Mirror Plant, is a striking tropical perennial native to Southeast Asia, particularly Malaysia and Borneo. It features large, heart-shaped metallic leaves with deep green, coppery-red, or bronze undertones that shimmer under light, giving the plant its “mirror” nickname. Mature leaves can reach 12–36 inches in length, supported by thick, upright stems up to 2 feet tall. This species was first documented by Karl Koch in 1861 during his expedition to Southeast Asia. Ideal for indoor tropical décor, the Alocasia Cuprea adds a bold, exotic touch to any plant collection.',

      care: { waterFrequency: 5, lightFrequency: 1, fertilizerFrequency: 30, waterThreshold: 1, lightThreshold: 7, fertilizerThreshold: 1
  },
  CareDifficulty: 'Moderate',
Watering: 'Water your Alocasia Cuprea every 1–2 weeks, depending on temperature and humidity. This plant naturally thrives in moist tropical environments, so it prefers soil that stays slightly damp but never soggy. Avoid letting the soil completely dry out. Check the top 2–3 inches of soil and water once it feels dry to the touch. Overwatering can lead to root rot, while underwatering may cause leaves to wilt or crisp. In warmer months, more frequent watering may be needed to maintain consistent moisture.',
Lighting: 'Alocasia Cuprea thrives in moderate to bright, indirect light. It loves a few hours of gentle morning sunlight from an east-facing window but should be shielded from harsh afternoon rays that can scorch its metallic leaves. It can tolerate medium indoor light but grows best with bright filtered sunlight for at least 6 hours daily. Avoid prolonged direct sun exposure to preserve the deep, glossy color of its foliage.',
Soil: 'Use a well-draining loam soil rich in organic matter or humus. Alocasia Cuprea does well in soil mixes that balance moisture retention and aeration — for example, a combination of potting soil, perlite, and coco coir or orchid bark. The goal is to keep the soil lightly moist while allowing excess water to drain freely to prevent root rot.',
  },{
    name: "Velvet Cardboard Anthurium",
    image: "ANTHURIUM CLARINERVIUM",
    plantId: 75,
  
    screen: "",
    description: 'The Velvet Cardboard Anthurium (Anthurium clarinervium) is a striking tropical epiphyte native to southern Mexico. Belonging to the Araceae family, it is admired for its thick, heart-shaped leaves with a velvety texture and bold, white veins that create a beautiful contrast against the deep green surface. In its natural habitat, it grows on tree trunks and branches to reach bright, filtered light. While it can produce small flowers, it’s mainly cultivated for its stunning foliage, making it a centerpiece in indoor plant collections. Note: Toxic if ingested — keep out of reach of pets and children.',

      care: { 
      waterFrequency: 7, // every 7 days
      lightFrequency: 1, // daily
      fertilizerFrequency: 30, // monthly

      // maximum allowed actions per week/day
      waterThreshold: 1, // once per week max
      lightThreshold: 7, // up to 7 days of light exposure tracking
      fertilizerThreshold: 1, // once per month max
    
  },
   CareDifficulty: 'Moderate',
Watering: 'Keep the soil evenly moist but never soggy. Water your Velvet Cardboard Anthurium thoroughly until excess water drains from the pot, then allow the top 1–2 inches (or about one-third of the soil) to dry out before watering again. Always ensure proper drainage to prevent root rot. During cooler months, reduce watering slightly but don’t let the soil completely dry out. Consistent, moderate moisture is key — overwatering can lead to root rot, while underwatering causes leaf browning and wilting.',
Lighting: 'This plant thrives in bright, indirect light. Avoid direct sunlight, which can scorch its velvety heart-shaped leaves. Place it near an east-facing window for gentle morning light or within a few feet of a bright south- or west-facing window filtered by sheer curtains. If light is too low, growth will slow and leaf veins may fade in contrast.',
Soil: 'Use a chunky, airy, and well-draining mix. Combine orchid bark, perlite, and rich houseplant compost or coco coir for ideal aeration and moisture balance. Orchid soil made from coarse pine bark is also suitable. Make sure the pot has drainage holes to prevent water buildup around the roots.',
  },{
    name: "Dragon Scale",
    image: "ALOCASIA DRAGON SCALE",
    plantId: 76,
  
    screen: "",
    description: 'Alocasia baginda, commonly known as Dragon Scale, is a striking Jewel Alocasia native to the rainforests of Borneo. Its dramatic, bumpy leaves with silver-green hues and deep dark green veins resemble the texture of a dragon’s scales, giving it its name. This tropical perennial is admired for its bold, exotic foliage and compact growth habit, making it a statement piece in indoor collections. Though stunning, it can be finicky — thriving in humidity, warmth, and indirect light. Note: Toxic to humans and pets if ingested.',

      care: { 
      waterFrequency: 7,
      lightFrequency: 1,
      fertilizerFrequency: 30,
      waterThreshold: 1,
      lightThreshold: 7,
      fertilizerThreshold: 1,
    } ,
  CareDifficulty: 'Moderate',
Watering: 'Keep the soil moist but not soggy. Water thoroughly when the top 1–2 inches of soil are dry to the touch. The Dragon Scale is sensitive to overwatering, so ensure excess water drains freely from the pot. Bottom watering can be effective to evenly moisten the soil — let the pot sit in a shallow tray of water for 10–15 minutes, then allow it to drain completely. Use distilled or filtered water to avoid chemical buildup. Water roughly once a week, adjusting based on temperature and humidity.',
Lighting: 'Thrives in bright, indirect light. Place it near a window with filtered sunlight or about 2 meters from a bright light source. Avoid direct sun exposure, which can burn its delicate leaves. Rotate the plant regularly for even growth. If kept in a dim area, gently rinse the leaves to help them better absorb light.',
Soil: 'Use a chunky, well-draining mix to prevent root rot. A blend of coco coir, perlite, and orchid bark in equal parts works best. This provides good aeration and moisture retention. Avoid dense, heavy potting soil as it can suffocate the roots.',
  },{
    name: "Satin Pothos",
    image: "TRAILING SILVER SATIN POTHOS",
    plantId: 77,
  
    screen: "",
    description: 'Scindapsus pictus ‘Argyraeus’, commonly known as Satin Pothos, is a popular and beginner-friendly indoor trailing plant. Its name “Argyraeus” means silvery, referring to the elegant silver variegation and spots on its heart-shaped green leaves. Native to the tropical regions of Bangladesh and Malesia, this plant climbs tree trunks in its natural habitat and can grow up to 10 feet tall and 4 feet wide. It’s loved for its velvety, shimmery foliage and easy-care nature, making it perfect for shelves, hanging baskets, or decorative pots.',

      care: { 
      waterFrequency: 7,
      lightFrequency: 1,
      fertilizerFrequency: 30,
      waterThreshold: 1,
      lightThreshold: 7,
      fertilizerThreshold: 1,
    } ,
  CareDifficulty: 'Easy',
Watering: 'Water once a week, allowing the soil to dry out in between waterings. Always let excess water drain out of the pot to avoid root rot. Check the soil by poking your finger about 2 inches deep — if it feels dry, it’s time to water. Pour room-temperature water slowly and deeply until it seeps out of the drainage holes. Avoid overwatering, as this can lead to yellowing leaves and wilting vines.',
Lighting: 'Prefers bright, indirect sunlight but can adapt to low to medium light. Avoid direct sun, which can scorch the delicate leaves. Ideal placement is near an east- or north-facing window with filtered light.',
Soil: 'Use a well-draining commercial indoor potting mix containing peat moss, pine bark, and perlite or vermiculite. Satin pothos prefers lightly acidic, moist but not soggy soil. Good drainage is essential to keep the roots healthy.',
  },{
    name: "Philodendron Micans",
    image: "PHILODENDRON MICANS",
    plantId: 78,
  
    screen: "",
    description: 'Philodendron hederaceum var. hederaceum, commonly called Philodendron Micans or Velvet-leaf Philodendron, is a tropical vining plant from southern Mexico, Central America, and the Caribbean. It’s prized for its soft, heart-shaped leaves with a luxurious bronze-green sheen that shimmers under the light. This evergreen vine trails beautifully from shelves or hanging baskets and can also climb with support. Its aerial roots help it attach and grow vertically if desired. Like most philodendrons, it’s toxic to humans and pets when ingested, so handle with care.',

      care: { 
      waterFrequency: 7,
      lightFrequency: 1,
      fertilizerFrequency: 30,
      waterThreshold: 1,
      lightThreshold: 7,
      fertilizerThreshold: 1,
    },
  CareDifficulty: 'Easy',
Watering: 'Water when the top 2–3 inches of soil feel dry to the touch. You can check this by inserting your finger or using a moisture meter (target reading: 2/4). Typically, watering once a week is sufficient, though frequency may vary depending on temperature, humidity, and light conditions. Watch the leaves closely—drooping and curling indicate underwatering, while mushy stems point to overwatering. Make sure the pot has drainage holes and never let the roots sit in water.',
Lighting: 'Bright, indirect light for 6–8 hours per day is ideal. Place the plant near an east-facing window for a gentle balance of light. Avoid intense west-facing afternoon sun, which can scorch the delicate, velvety leaves. Philodendron micans tolerates medium light but thrives best in bright, filtered light.',
Soil: 'Prefers loamy, moist but well-drained soil with a slightly acidic pH. A suitable mix includes 1 part potting soil, 1 part orchid bark, 1 part perlite, and 1 part peat moss or coco coir. This ensures proper aeration and drainage while retaining enough moisture for healthy root growth.',
  },{
    name: "Arrowhead Vine 'Golden Allusion'",
    image: "GOLDEN ALLUSION",
    plantId: 79,
  
    screen: "",
    description: 'Syngonium podophyllum ‘Gold Allusion’, commonly called Arrowhead Vine ‘Gold Allusion’, is a popular tropical houseplant known for its golden-green foliage and easy care requirements. Its arrowhead-shaped leaves bring a fresh, vibrant touch to indoor spaces. In addition to its ornamental value, this plant is also air-purifying, helping remove toxins and improve indoor air quality. Adaptable and low-maintenance, it’s an excellent choice for beginners and thrives well in indoor environments with proper light and moisture.',

      care: { 
      waterFrequency: 5,
      lightFrequency: 1,
      fertilizerFrequency: 30,
      waterThreshold: 1,
      lightThreshold: 7,
      fertilizerThreshold: 1,
    } ,
  CareDifficulty: 'Easy',
Watering: 'Water once a week or when the top inch of soil begins to dry. Keep the soil consistently and lightly moist—but avoid overwatering, as this can lead to brown spots and leaf drop. Curly or dry leaves are a sign the plant is thirsty. Always check the soil before watering. It’s best to water in the early morning or late evening when temperatures are cooler. Overwatering should be avoided at all costs to prevent root rot.',
Lighting: 'Thrives in bright indoor light or indirect sunlight for 6–8 hours daily. While this plant can tolerate both low light and full sun, the best results come from bright but indirect light. Excessive direct sun can scorch the leaves, while too much shade can cause leggy growth and faded foliage. Place it near a window with filtered light or under artificial grow lights to maintain vibrant leaf coloration and lush growth.',
Soil: 'Prefers slightly acidic, well-draining soil with rich organic matter (pH 5.5–6.5). The ideal mix is loose and breathable—such as a combination of peat, leaf mold, and coarse sand or vermiculite. Keep the soil moist but never soggy to avoid root rot.',
  },{
    name: "Golden Orlando Philodendron",
    image: "PHILODENDRON ORLANDO",
    plantId: 80,
  
    screen: "",
    description: 'Philodendron ‘Orlando’, commonly known as Golden Orlando Philodendron, Golden Goddess, Malay Gold, or Lemon-Lime Philodendron, is a tropical climbing plant prized for its stunning golden-yellow foliage. Native to Central and South America and the Caribbean, this plant adds a vibrant pop of color to any indoor or outdoor space. It’s low-maintenance and well-suited for both beginner and seasoned plant enthusiasts. However, like many philodendrons, it is toxic if ingested—keep out of reach of pets and children.',

        care: { 
      waterFrequency: 7,
      lightFrequency: 1,
      fertilizerFrequency: 30,
      waterThreshold: 1,
      lightThreshold: 7,
      fertilizerThreshold: 1,
    },
  CareDifficulty: 'Easy',
Watering: 'Water your Philodendron when the top 50–75% of the soil is dry. Water thoroughly until excess drains from the pot, and discard any collected water in the saucer. Overwatering can lead to wilting and root rot, so make sure the soil has good drainage. On average, this plant needs about 0.8 cups of water every 9 days when grown in a 5-inch pot without direct sunlight.',
Lighting: 'Thrives in bright, indirect light but can tolerate low light conditions. For best growth, place near east- or west-facing windows. Avoid direct sunlight, as it can scorch the delicate golden-yellow leaves. If placed indoors, position it within 6 feet of a south-facing window to ensure it receives enough light.',
Soil: 'Use a well-draining, sterile potting mix formulated for houseplants. A mix rich in organic matter (like coco coir) combined with perlite or vermiculite works best. Adding a handful of perlite to standard potting soil improves aeration and prevents waterlogging.',
  },
  {
    name: "Philodendron Mayoi",
    image: "PHILODENDRON MAYOI",
    plantId: 81,
  
    screen: "",
    description: 'Philodendron mayoi is a stunning tropical hemiepiphytic climber native to the rainforests of Brazil, particularly in Minas Gerais and Goiás. It begins its life attached to trees and eventually sends roots down to the forest floor, creating a lush, natural look when grown indoors with a support pole. Its deeply lobed green leaves give a tropical, exotic vibe to any space. Like most philodendrons, it is toxic to pets and humans if ingested, so keep it out of reach of children and animals.',

      care: { 
      waterFrequency: 7,
      lightFrequency: 1,
      fertilizerFrequency: 30,
      waterThreshold: 1,
      lightThreshold: 7,
      fertilizerThreshold: 1,
    } ,
  CareDifficulty: 'Easy',
Watering: 'Keep the soil lightly moist during the growing season, allowing the top 2–3 cm (about 1 inch) to dry between waterings. Typically, watering once a week is sufficient. Avoid letting the soil become soggy, as overwatering can cause root rot. Consistent moisture is ideal, but the roots should never sit in water.',
Lighting: 'Prefers bright, indirect light for optimal growth. It can tolerate moderate or dappled shade but may grow more slowly in low light. Avoid prolonged exposure to direct sunlight, which can scorch the leaves. A bright indoor spot near a filtered window is ideal.',
Soil: 'Use a well-draining potting mix rich in organic matter. A peat-free soil blend is recommended for sustainability. Adding perlite or orchid bark can help improve drainage and aeration.',
  },
  {
    name: "Philodendron Cream Splash",      //misplelled
    image: "PHILODENDRON CREAM SPLASH",
    plantId: 82,
  
    screen: "",
    description: 'Commonly known as Philodendron Cream Splash, the botanical name of this plant is Philodendron hederaceum var. oxycardium ‘Cream Splash’. This beautiful trailing houseplant is prized for its heart-shaped leaves with creamy white and soft green variegation, creating a delicate and elegant look. Native to the tropical rainforests of Central and South America, it grows as a trailing or climbing vine, making it ideal for hanging baskets, plant shelves, or decorative planters. This plant belongs to the Araceae family and, like many philodendrons, is toxic to pets and humans if ingested. Its low-maintenance nature and vibrant foliage make it a popular choice for both beginners and experienced plant collectors.',

    care: { 
      waterFrequency: 7,
      lightFrequency: 1,
      fertilizerFrequency: 30,
      waterThreshold: 1,
      lightThreshold: 7,
      fertilizerThreshold: 1,
    } ,
 CareDifficulty: 'Easy',
Watering: 'Requires moderate watering. Water when the top 1–2 inches (about 3–5 cm) of soil feel dry. Philodendron Cream Splash prefers consistently moist soil but should never be waterlogged. Always allow excess water to drain to prevent root rot.',
Lighting: 'Thrives in bright, indirect light. Avoid direct sunlight, which can scorch the leaves. It can tolerate lower light levels but may lose its vibrant variegation and slow down in growth.',
Soil: 'Prefers a well-draining, lightweight, and nutrient-rich potting mix. A blend of peat, perlite, and pine bark works well. Ideal pH is slightly acidic to neutral (5.5–7). Adding perlite or vermiculite improves aeration and drainage.',
  },
  {
    name: "Syngonium Albo",
    image: "SYNGONIUM ALBO",
    plantId: 83,
  
    screen: "",
    description: 'Commonly known as Syngonium Albo, the botanical name of this plant is Syngonium podophyllum ‘Albo Variegatum’. This stunning variegated cultivar of the Arrowhead Vine features dark green, arrowhead-shaped leaves marbled with irregular white variegation, making each leaf unique. Native to the tropical rainforests of Central and South America, it grows as a climbing or trailing vine in its natural habitat, often scaling tree trunks in the canopy layer. This plant is easy to care for, making it ideal for both beginners and collectors. Like many aroids, it is toxic to pets and humans if ingested.',

      care: { 
      waterFrequency: 5,
      lightFrequency: 1,
      fertilizerFrequency: 45,
      waterThreshold: 1,
      lightThreshold: 7,
      fertilizerThreshold: 1,
    } ,
 CareDifficulty: 'Easy',
Watering: 'Regularly check the soil and water when the top 2 inches are dry to the touch. Plants grown outdoors in summer may need more frequent watering than those indoors. Allow the plant to partially dry out between waterings. Overwatering can cause the leaves to turn yellow or brown, while underwatering can lead to crispy lower leaves. Water about 1–2 times a week, adjusting based on humidity and season. If grown in standing water, change the water at least once per week to prevent rotting',
Lighting: 'Prefers bright, indirect light for 6 to 8 hours daily. It can adapt to medium light but may lose some variegation. Avoid harsh direct sunlight as it may scorch the leaves.',
Soil: 'Grows best in slightly acidic, fertile, and well-draining potting mixes. A good mix is equal parts high-quality potting soil, bark, and perlite. Alternatively, use half potting soil with a quarter perlite and a quarter coconut coir or moss. Ideal pH is 5.5 to 6.5. The soil must be porous to provide both moisture and airflow to the roots.',
  },
  {
    name: "Pink Arrowhead Vine",
    image: "NEON ROBUSTA",
    plantId: 84,
  
    screen: "",
    description: 'Commonly known as Pink Arrowhead Vine, the botanical name of this plant is Syngonium podophyllum ‘Neon Robusta’. This eye-catching cultivar features soft light green leaves kissed with rosy pink hues, creating a vibrant contrast in any indoor space. Native to Central and South America, Syngonium plants are subtropical climbers that can be grown as bushy houseplants, trailing vines, or terrarium plants. As it matures, its foliage changes shape, and older plants can reach up to 1 foot tall with 2-foot trailing vines. This variety is popular for its low-maintenance nature and striking color, making it a favorite among beginner and experienced plant collectors alike.',

      care: { 
      waterFrequency: 5,
      lightFrequency: 1,
      fertilizerFrequency: 30,
      waterThreshold: 1,
      lightThreshold: 7,
      fertilizerThreshold: 1,
    } ,
 CareDifficulty: 'Easy',
Watering: 'Use filtered, bottled, or tap water that’s been left out for 24 hours to allow chemicals like chlorine to dissipate. Water once a week or when the top inch of soil feels slightly dry. Water thoroughly until excess water drains from the bottom of the pot, then empty any standing water from cachepots or saucers. Keep the soil lightly moist but not soggy—overwatering can cause brown spots and leaf drop. Curly or dry leaves indicate underwatering. Water early in the morning or late evening when temperatures are cooler.',
Lighting: 'Prefers bright, indirect light for 6–8 hours daily. Place near a north or east-facing window to provide bright but filtered sunlight. Avoid direct sun exposure as it can scorch and burn the delicate pink leaves. This plant also adapts well to medium light but may lose some of its vibrant color if light is insufficient.',
Soil: 'Thrives in a light, airy substrate with good water retention and drainage. A mix of coco coir, orchid bark (or perlite), and a touch of organic compost or worm castings works well. The soil should stay moist but well-aerated to support healthy root growth.',
  },
  {
    name: "Red Anne",
    image: "RED ANNE",
    plantId: 85,
  
    screen: "",
    description: 'Commonly known as Nerve Plant or Silver-Net Leaf ‘Red Anne’, the Red Anne Nerve Plant is a cultivar of Fittonia verschaffeltii, native to the tropical rainforests of Peru and Colombia. It features small, velvety-textured green leaves with a dense network of bright red veins, often making the plant appear more red than green. This compact variety typically grows up to 6–10 inches tall and can spread up to 18 inches, making it ideal for terrariums or tabletop displays. The stems are covered with fine white hairs, adding to its delicate appearance.',

      care: { 
      waterFrequency: 5,
      lightFrequency: 1,
      fertilizerFrequency: 30,
      waterThreshold: 1,
      lightThreshold: 7,
      fertilizerThreshold: 1,
    },
 CareDifficulty: 'Easy',
Watering: 'Water until it drains at the bottom of the pot. Water once a week or when the top 1–2 inches of soil is dry. Typically, watering about once or twice a week is ideal, depending on humidity levels. Nerve plant ‘Red Anne’ thrives in well-draining containers to prevent waterlogging, ensuring optimal health without excessive saturation.',
Lighting: 'Place the Red Nerve Plant in bright, indirect light, such as near an east- or north-facing window.',
Soil: 'The Red Nerve Plant thrives in a well-draining, nutrient-rich soil mix. A combination of peat-based potting mix with perlite or sand ensures proper drainage and aeration. The ideal pH range is between 5.5 and 6.5 (slightly acidic).',
  },

  {
    name: "Syngonium podophyllum 'Berry Allusion'",
    image: "BERRY ALLUSION",
    plantId: 86,
  
    screen: "",
    description: 'Commonly known as Berry Allusion Arrowhead Plant, the botanical name of this plant is Syngonium podophyllum Berry Allusion. This popular houseplant is prized for its attractive foliage and easy-care nature. Its arrowhead-shaped leaves feature soft shades of green with subtle pink veins, adding a delicate and elegant touch to any space. Native to the tropical rainforests of Mexico, Central America, and parts of South America, this Syngonium grows as a climbing or trailing vine in its natural habitat. It thrives in warm, humid environments and is well-suited for indoor settings. Like other Syngoniums, it is mildly toxic to humans and pets if ingested, so keep it out of reach of children and animals.',

      care: { 
      waterFrequency: 5, // every 5 days
      lightFrequency: 1, // daily
      fertilizerFrequency: 45, // monthly and a half
      waterThreshold: 1,
      lightThreshold: 7,
      fertilizerThreshold: 1,
    },
 CareDifficulty: 'Easy',
Watering: 'Berry Allusion Arrowhead Plant needs around 0.8 cups of water every 9 days when it doesnt get direct sunlight and is potted in a 5.0" pot. Maintain a steady balance of moisture without making the soil soggy. Watering once a week is ideal to mimic its natural tropical environment. Allow the top inch of soil to dry between waterings to avoid overwatering and root rot.',
Lighting: 'Thrives in bright, indirect light but can tolerate low to medium light. Avoid direct sunlight, as it may burn the leaves. Place the plant less than 6 feet from a south-facing window or in a well-lit room. Rotate the pot regularly during the growth season for even development.',
Soil: 'Prefers acidic, humus-rich, and well-draining soil with a pH of 5.5–6.5. A good potting mix enriched with organic matter works well. Keep the soil consistently moist, especially during spring and summer, but never waterlogged.',
  },

{
    name: "Maranta arundinacea 'Variegata",
    image: "VARIEGATED ARROWROOT",
    plantId: 87,
  
    screen: "",
    description: 'Commonly known as Variegated Arrowroot, the botanical name of this plant is Maranta arundinacea Variegata. This stunning tropical plant is prized for its oval-shaped leaves with alternating cream and green stripes, giving it a painterly, elegant appearance. It can also produce small, delicate white flowers. Native to the tropical rainforests of Brazil and South America, this plant naturally grows under dense tree canopies, thriving in warm, humid environments. Historically, arrowroot was grown commercially for its starchy rhizomes, but today it’s more popular as an ornamental houseplant. Variegated Arrowroot can grow up to 2.5 to 3 feet tall indoors and is well-suited for decorative corners or shelves. Like other members of its family, it prefers indirect light, consistent moisture, and high humidity to maintain its lush look.',

     care: { 
      waterFrequency: 4,
      lightFrequency: 1,
      fertilizerFrequency: 30,
      waterThreshold: 2,
      lightThreshold: 7,
      fertilizerThreshold: 1,
    } ,
 CareDifficulty: 'Easy',
Watering: 'Variegated Arrowroot needs about 0.8 cups of water every 9 days when it doesn’t get direct sunlight and is potted in a 5.0" pot. This plant thrives in a moist environment, so daily watering during spring and summer is recommended, ensuring excess water drains completely. Reduce watering to once a week in winter. Always check soil moisture up to 2 inches deep before watering—either with your finger or a moisture meter—to avoid overwatering or underwatering. For best results, use rainwater, filtered, or distilled water to prevent mineral buildup. Water deeply and allow all excess water to drain out.',
Lighting: 'Prefers bright, indirect light and can tolerate being away from a window (up to 6 feet from a south-facing window). Avoid direct sunlight, as it can scorch the leaves or cause them to curl. Indirect light helps maintain the vibrant cream and green variegation on the foliage.',
Soil: 'Grows best in moist but well-draining soil that retains moisture without staying soggy. An ideal mix includes:1 part common houseplant potting soil, 1 part coconut coir or peat moss (for moisture retention), 1 part perlite (for drainage) Prefers slightly acidic soil with a pH of 5.5 to 6.0. Using sterilized soil helps prevent fungal and bacterial issues.',
  },
{
    name: "Hairy Philodendron ",
    image: "PHILODENDRON SQUAMIFERUM",
    plantId: 88,
  
    screen: "",
    description: 'Commonly known as Hairy Philodendron or Red-Bristle Philodendron, the botanical name of this plant is Philodendron squamiferum. This rare climbing species is native to the tropical rainforests of Central America, French Guiana, and Brazil, where it grows as an epiphyte, climbing tree trunks. It’s admired for its distinctive red-brown stems covered in soft, hair-like bristles and deeply lobed, glossy green leaves, giving it a unique tropical aesthetic. Mature plants can grow impressively tall with leaves reaching up to 18 inches in length. This plant is toxic if ingested and should be kept out of reach of pets and children. Its striking structure and climbing habit make it a stunning statement plant for indoor jungle-style spaces.',

     care: { 
      waterFrequency: 7,
      lightFrequency: 1,
      fertilizerFrequency: 30,
      waterThreshold: 1,
      lightThreshold: 7,
      fertilizerThreshold: 1,
    },
 CareDifficulty: 'Moderate',
Watering: 'Watering is one of the most crucial parts of caring for Philodendron Squamiferum. This tropical plant thrives in consistently moist soil but is sensitive to overwatering, which can lead to root rot. Allow the top 1 inch of soil to dry slightly between waterings. You can check moisture by inserting your finger into the soil or using a moisture meter for accuracy. Once the top layer feels dry, water thoroughly and let excess water drain completely through the pot’s drainage holes. Avoid letting the plant sit in standing water.',
Lighting: 'Prefers bright, indirect light but can tolerate moderate light conditions. Avoid direct sunlight as it can scorch the leaves. If placed indoors, keep it near an east-facing window or a well-lit spot with filtered light. For south or west-facing windows, use sheer curtains to diffuse intense sunlight. If placed outdoors, grow it under a tree canopy or a shaded area where it can receive dappled light.',
Soil: 'Philodendron Squamiferum requires light, well-draining, and airy soil to support healthy root development. A compact or heavy mix can lead to poor aeration and root rot. Use a porous potting mix that allows water to flow through easily while retaining some moisture. A blend of houseplant potting mix with perlite, bark, or coco coir works best.',
  },
{
    name: "White Butterfly ",
    image: "SYNGONIUM WHITE BUTTERFLY",
    plantId: 89,
  
    screen: "",
    description: 'Commonly known as White Butterfly or White Arrowhead, the botanical name of this plant is Syngonium podophyllum White Butterfly. This popular climbing foliage plant is native to the semi-tropical regions of Brazil, Bolivia, Ecuador, and Mexico. It’s a perennial aroid recognized for its arrowhead-shaped leaves with soft green and creamy white tones. Indoors, it can reach up to 6 feet in length, with individual leaves growing around 5–7 inches long. Its low-maintenance nature and attractive variegation make it a favorite for both new and experienced plant owners. Like other Syngoniums, this plant is mildly toxic if ingested, so it’s best kept out of reach of pets and small children.',

       care: { 
      waterFrequency: 5,
      lightFrequency: 1,
      fertilizerFrequency: 45,
      waterThreshold: 1,
      lightThreshold: 7,
      fertilizerThreshold: 1,
    } ,
 CareDifficulty: 'Easy',
Watering: 'The White Butterfly Arrowhead thrives in evenly moist soil, but it’s important to avoid waterlogging. Water thoroughly when the top 2–3 cm of soil feels dry to the touch. Reduce watering slightly during winter when growth slows down, but don’t let the soil completely dry out. Always use a pot with proper drainage holes to prevent root rot. Consistent watering helps maintain healthy foliage, while overwatering can lead to yellowing leaves.',
Lighting: 'This plant prefers bright, indirect light, but it can tolerate medium to lower light levels. Avoid prolonged direct sunlight as it can scorch the delicate foliage, while insufficient light may reduce its signature variegation. East- or north-facing windows are ideal, or use filtered light near brighter windows.',
Soil: 'Use a well-draining, moisture-retentive potting mix. A good blend is ½ all-purpose potting mix, ¼ coco coir, and ¼ pumice or charcoal, optionally enhanced with a few handfuls of worm compost. This ensures proper aeration and moisture balance, preventing root issues. Repot every 1–2 years during spring to refresh the nutrients and support growth.',
  },

{
    name: "Philodendron Burle Marx",
    image: "PHILODENDRON BURLE MARX",
    plantId: 90,
  
    screen: "",
    description: 'Commonly known as Burle Marx Philodendron, the botanical name of this plant is Philodendron Burle-Marxii. This exotic variety from the Araceae family is native to the tropical rainforests of Brazil. It’s named after the famous Brazilian landscape architect Roberto Burle Marx. Known for its lush, elongated green leaves and air-purifying properties, this plant can grow 2–3 feet tall indoors and spread widely. It poses mild toxicity to humans, dogs, and cats if ingested. Ideal for experienced plant keepers, this Philodendron brings a bold tropical vibe to any indoor space.',

      care: { 
      waterFrequency: 6,
      lightFrequency: 1,
      fertilizerFrequency: 30,
      waterThreshold: 1,
      lightThreshold: 7,
      fertilizerThreshold: 1,
    },
 CareDifficulty: 'Difficult',
Watering: 'Burle Marx Philodendron thrives in consistently moist environments and requires regular watering. Water thoroughly once or twice a week, allowing the top 1–2 inches of soil to dry out before watering again. It can tolerate short dry spells but should not be left to dry out completely. Avoid overwatering, as soggy soil can lead to root rot. Consistent moisture helps the plant maintain its lush foliage year-round.',
Lighting: 'Prefers bright, indirect light for optimal growth. It can also tolerate partial sun or even full shade, but low light may slow its growth and reduce leaf vibrancy. Avoid harsh direct sunlight, which can scorch the leaves.',
Soil: 'Best grown in loose, fertile, and well-draining soil with a slightly acidic pH of 5.5–5.6. A good potting mix is ½ peat, ¼ perlite, and ¼ garden soil. You can also use a special Philodendron mix. Adding humus to the soil improves aeration and overall plant health.',
  },

{
    name: "Lemon Cypress",
    image: "CYPRESS TREE",
    plantId: 91,
  
    screen: "",
    description: 'Commonly known as Lemon Cypress or Goldcrest Monterey Cypress, the botanical name of this plant is Cupressus macrocarpa ‘Goldcrest’ (also called Hesperocyparis macrocarpa). Native to California, this cultivar is prized for its bright yellow-green foliage and fresh, lemony scent. It features upward-growing branches, creating a neat, conical shape perfect for both indoor and outdoor settings. Originally discovered in the Eastern Mediterranean basin, it was later imported to Italy and then spread to different parts of the world. Its vibrant color makes it a beautiful accent plant, especially when paired with darker green conifers.',

      care: { 
      waterFrequency: 3,
      lightFrequency: 1,
      fertilizerFrequency: 60,
      waterThreshold: 2,
      lightThreshold: 7,
      fertilizerThreshold: 1,
    } ,
 CareDifficulty: 'Moderate',
Watering: 'Keep the soil consistently moist but not soggy. Water deeply once a week or when the top inch of soil feels dry. Ensure excess water drains out of the pot to prevent root rot and keep the roots healthy. Avoid letting the soil dry out completely, as this plant prefers steady moisture.',
Lighting: 'Prefers bright, indirect light. Place near a sunny window where it can receive 5 to 6 hours of indirect sunlight or gentle morning sun. Avoid west-facing windows, as harsh afternoon light can damage the foliage. It thrives well indoors in bright, filtered light.',
Soil: 'Lemon Cypress grows best in poor, sandy, well-draining soil that’s low in organics. This kind of soil helps the tree grow at a balanced pace, allowing the roots to develop well and keeping the plant stable against strong winds. The soil should remain moist but can tolerate short periods of dryness.',
  },

{
    name: "Golden Selloum",
    image: "GOLDEN SELLOUM",
    plantId: 92,
  
    screen: "",
    description: 'Commonly known as Golden Selloum, the botanical name of this plant is Philodendron selloum ‘Golden’. This popular ornamental foliage plant is native to tropical South America, including Brazil, Bolivia, Argentina, and Paraguay. It features bright yellow, glossy leaves with deep lobes and long stems that follow the light, making it a striking addition to indoor spaces. Over time, the plant develops a trunk, though its lush foliage often hides it. Golden Selloum also has the ability to remove harmful toxins from the air, making it not just decorative but also beneficial to indoor environments. Its low-maintenance nature makes it perfect for homes.',

     care: { 
      waterFrequency: 7,
      lightFrequency: 1,
      fertilizerFrequency: 30,
      waterThreshold: 1,
      lightThreshold: 7,
      fertilizerThreshold: 1,
    } ,
 CareDifficulty: 'Easy',
Watering: 'Water the plant once a week or when the top 1–2 inches of soil feel dry to the touch. Ensure proper drainage so excess water flows out of the pot, allowing moisture to reach the roots while preventing root rot. Avoid letting the soil stay soggy for long periods.',
Lighting: 'Thrives best in medium to bright indirect sunlight. Keep the plant indoors near a bright window with filtered natural light or under bright artificial light. Rotate the pot occasionally to encourage even growth, as the leaves tend to face the light source.',
Soil: 'Use well-draining and fertile soil to keep the Philodendron healthy. It prefers moist soil but can tolerate short dry periods. A loose, nutrient-rich potting mix is ideal for proper aeration and drainage.',
  },

{
    name: "Cobra Fern",
    image: "COBRA FERN",
    plantId: 93,
  
    screen: "",
    description: 'Commonly known as Variegated Arrowroot, the botanical name of this plant is Maranta arundinacea Variegata. This stunning tropical plant is prized for its oval-shaped leaves with alternating cream and green stripes, giving it a painterly, elegant appearance. It can also produce small, delicate white flowers. Native to the tropical rainforests of Brazil and South America, this plant naturally grows under dense tree canopies, thriving in warm, humid environments. Historically, arrowroot was grown commercially for its starchy rhizomes, but today it’s more popular as an ornamental houseplant. Variegated Arrowroot can grow up to 2.5 to 3 feet tall indoors and is well-suited for decorative corners or shelves. Like other members of its family, it prefers indirect light, consistent moisture, and high humidity to maintain its lush look.',

       care: { 
      waterFrequency: 4,
      lightFrequency: 1,
      fertilizerFrequency: 30,
      waterThreshold: 2,
      lightThreshold: 7,
      fertilizerThreshold: 1,
    } ,
 CareDifficulty: 'Moderate',
Watering: 'Water the plant 2–3 times a week, but always check the top ½ inch of soil to ensure it’s dry before the next watering. Deeply and evenly water once to twice a week, allowing excess water to drain from the bottom of the pot to avoid root rot. Keep the soil moist but never soggy.',
Lighting: 'Thrives best in bright, indirect light or part shade indoors. Avoid placing it under harsh direct sunlight to prevent leaf burn.',
Soil: 'Prefers moist, well-draining soil. A loose, airy mix that retains moisture without becoming waterlogged is ideal for healthy root development.',
  },
{
    name: "Lady Palm",
    image: "RHAPIS EXCELSA",
    plantId: 94,
  
    screen: "",
    description: 'Commonly known as Lady Palm, the botanical name of this plant is Rhapis excelsa. It is a popular ornamental palm prized for its elegant, fan-shaped ribbed leaves and compact growth habit. Native to the damp mountain forests of southern China and Taiwan, this palm features slender, bamboo-like stems and lush, dark green foliage that adds a touch of sophistication to any indoor space.The Lady Palm is non-toxic to both humans and animals, making it a safe option for homes with pets. It also improves indoor air quality by releasing moisture through transpiration, which helps combat dry air in air-conditioned or heated rooms. Slow-growing and tolerant of low-light environments, it fits beautifully near bright windows and requires minimal maintenance.',

       care: { 
      waterFrequency: 5,
      lightFrequency: 1,
      fertilizerFrequency: 60,
      waterThreshold: 1,
      lightThreshold: 7,
      fertilizerThreshold: 1,
    } ,
 CareDifficulty: 'Easy',
Watering: 'Keep the soil consistently moist but never waterlogged. Allow the top inch of soil to dry out between waterings to prevent root rot. The suggested watering schedule is once a week or when the top 2–3 inches of soil has dried. Make sure to let excess water drain from the pot to avoid soggy roots.',
Lighting: 'Thrives in bright, indirect light but can also tolerate low light conditions. Avoid placing the plant in direct sunlight, as this can burn its leaves.',
Soil: 'Prefers well-draining soil rich in organic matter. A mix that allows moisture retention without waterlogging works best.',
  },

{
    name: "Yucca",
    image: "YUCCA TREE",
    plantId: 95,
  
    screen: "",
    description: 'Commonly known as Yucca, Spanish bayonet, spineless yucca, Adam’s needle and thread, or Spanish dagger, this hardy and architectural plant is botanically named Yucca elephantipes (also includes species Y. aloifolia, Y. filamentosa, and Y. gloriosa). Native to the hot, dry deserts of the Americas and Mexico, the Yucca plant is recognized by its sword-like leaves and upright, tree-like structure, making it a striking addition to indoor and outdoor spaces. Yucca plants can grow between 55 cm to 10 m (22 in to 33 ft) tall with a spread of 1.5 m to 8 m (5 ft to 26 ft). Growth rates vary depending on the species—some grow as much as 2 feet per year, while others grow more slowly at around 5 inches annually.All parts of the Yucca plant are toxic to dogs and cats, so pet owners should place this plant out of reach of their pets.',

      care: { 
      waterFrequency: 10,
      lightFrequency: 1,
      fertilizerFrequency: 60,
      waterThreshold: 1,
      lightThreshold: 7,
      fertilizerThreshold: 1,
    } ,
 CareDifficulty: 'Moderate',
Watering: 'Yucca plants are very sensitive to overwatering. Water once a week during the summer growing season, making sure the soil has excellent drainage and is allowed to dry out completely between waterings to prevent root rot.',
Lighting: 'Prefers bright, filtered light. Yucca thrives in bright, indirect light but can also tolerate some direct sun, making it ideal for well-lit indoor areas.',
Soil: 'Use a loose, well-drained potting mix. For best results, blend in coarse sand and perlite to promote proper drainage and avoid soggy soil.',
  },

{
    name: "Philodendron ‘Hope’ ",
    image: "SELLOUM",
    plantId: 96,
  
    screen: "",
    description: 'Commonly known as Lacy Tree Philodendron, Philodendron Hope, or Philodendron Lickety-Split, this plant is botanically named Thaumatophyllum bipinnatifidum (formerly Philodendron selloum). Native to South America, this tropical foliage plant features deeply lobed, glossy green leaves that bring a lush, exotic look to any indoor space. A mature plant typically reaches 12" to 18" tall from the soil line to the top of the foliage. This plant may not be safe for pets, as it can cause irritation if ingested. It’s best to keep it out of reach of cats and dogs.',

       care: { 
      waterFrequency: 7,
      lightFrequency: 1,
      fertilizerFrequency: 30,
      waterThreshold: 1,
      lightThreshold: 7,
      fertilizerThreshold: 1,
    } ,
 CareDifficulty: 'Moderate',
Watering: 'Water every 1–2 weeks, allowing the soil to dry out between waterings. Water more often in brighter light and less in lower light. Philodendron selloum appreciates consistent but not overly wet soil. Water thoroughly when the top inch of soil is dry, and let the excess water drain out to avoid root rot. Avoid letting the plant sit in standing water and try not to splash water on its leaves to prevent fungal issues. During winter, when growth slows, reduce watering frequency and keep it away from drafty spots where the soil might dry out too quickly.',
Lighting: 'Thrives in bright, indirect light, but can tolerate medium to low indirect light. Not suitable for harsh afternoon direct sun. An east or west-facing window with filtered light is ideal. Too much intense light can scorch the leaves, while too little light can result in pale, smaller foliage and slower growth. LED grow lights can be used to supplement natural light if needed. Watch for signs like curling or browning leaves (too much light) or drooping and pale leaves (too little light) to adjust placement accordingly.',
Soil: 'Prefers a well-draining, nutrient-rich mix. Combine equal parts peat moss, perlite, and coarse sand to maintain good moisture without waterlogging. Avoid dense or compact soils that can lead to root rot. Adding organic matter like compost or worm castings helps boost soil nutrients and promotes healthy growth.',
  },

{
    name: "Fortune Plant",
    image: "FORTUNE PLANT",
    plantId: 97,
  
    screen: "",
    description: 'Commonly known as Fortune Plant or Corn Plant, the botanical name of this species is Dracaena fragrans ‘Massangeana’. It is native to the humid tropical regions of Africa, particularly Upper Guinea. Its long, arching, striped green-and-yellow leaves grow from a central stalk, resembling a corn plant. Aside from its ornamental appeal, this plant is valued for its air-purifying qualities, effectively removing indoor air pollutants like cigarette smoke and glue fumes. This plant is toxic when ingested in large amounts, so it’s best to keep it out of reach of pets and children.',

       care: { 
      waterFrequency: 5,
      lightFrequency: 1,
      fertilizerFrequency: 45,
      waterThreshold: 1,
      lightThreshold: 7,
      fertilizerThreshold: 1,
    } ,
 CareDifficulty: 'Easy',
Watering: 'Water thoroughly until it drains from the bottom of the pot. Every 10–14 days is ideal, allowing the soil to dry out between waterings. Water evenly around the plant and avoid overwatering—when in doubt, skip watering to prevent root rot. In warmer months, watering once a week may be needed. Always ensure proper drainage to keep the roots healthy.',
Lighting: 'Thrives in bright, indirect light but can tolerate low to medium light conditions. Avoid harsh direct sunlight, which can scorch the leaves. This plant grows best in a spot with filtered sunlight or near a bright window. Lower light levels may result in slower growth but won’t harm the plant.',
Soil: 'Prefers well-draining, loose potting soil that retains some moisture without becoming soggy. A mix of all-purpose potting soil with a bit of perlite or sand works well to ensure proper aeration and drainage.',
  },
{
    name: "Dona Carmen",
    image: "DONA CARMEN",
    plantId: 98,
  
    screen: "",
    description: 'Commonly known as Dona Carmen, the botanical name of this plant is Aglaonema ‘Dona Carmen’. It features elegant long, oval leaves with a greenish-white base and splashes of pink and red hues in the middle, attached to beige stems. Over time, this plant can also produce flowers. Native to the tropical and subtropical rainforests of Asia—particularly Thailand, Indonesia, Malaysia, and the Philippines—Aglaonema grows beneath tall trees, making it naturally adapted to low-light areas. Introduced to the West in 1885 at the Royal Botanic Gardens, it has since been hybridized into many stunning varieties. This plant is prized for its beauty, resilience, and low-maintenance care.',

       care: { 
      waterFrequency: 5,
      lightFrequency: 1,
      fertilizerFrequency: 45,
      waterThreshold: 1,
      lightThreshold: 7,
      fertilizerThreshold: 1,
    } ,
 CareDifficulty: 'Easy',
Watering: 'Water once a week or when the top 2 to 3 inches of the soil feels dry. These houseplants prefer slight underwatering over overwatering, so forgetting a watering session occasionally won’t harm them. Make sure excess water drains out of the pot to keep the roots healthy. This deep watering method ensures water reaches the root zone while preventing root rot. Keep the soil lightly moist but never soggy.',
Lighting: 'Prefers bright, indirect light for optimal growth, but can tolerate low-light conditions as well, making it ideal for indoor spaces. Avoid harsh direct sunlight, as this can scorch the leaves.',
Soil: 'Use a well-draining, fertile potting mix rich in organic matter. A good mix can be made with all-purpose potting soil blended with perlite or coco coir to ensure proper aeration and drainage.',
  },

{
    name: "Philodendron Burle Marx", // skipped 
    image: "RED SIAM AURORA",
    plantId: 99,
  
    screen: "",
    description: 'Commonly known as Red Siam Aurora, the botanical name of this plant is Aglaonema ‘Red Siam Aurora’. This stunning houseplant is part of the Chinese Evergreen family and is admired for its glossy, oval dark green leaves with vibrant red and pink edges. It’s an easy-care indoor decorative plant and a fast grower, staying lush without quickly outgrowing its pot. Red Aglaonemas are commonly sold in 6″, 8″, and 10″ pots. Native to the tropical and subtropical rainforests of Asia—particularly Thailand, Indonesia, Malaysia, and the Philippines—this plant naturally thrives in low-light understory environments, making it perfect for indoor spaces.',

      care: { 
      waterFrequency: 6, // every 6 days
      lightFrequency: 1, // daily
      fertilizerFrequency: 30, // monthly
      // maximum allowed actions per week/day
      waterThreshold: 1, // once per week max
      lightThreshold: 7, // up to 7 days of light exposure tracking
      fertilizerThreshold: 1, // once per month max
    } ,
 CareDifficulty: 'Easy',
Watering: 'Red Siam Aurora Aglaonema needs about 0.8 cups of water every 7 days when it doesn’t receive direct sunlight and is potted in a 5.0" pot. A once-a-week watering schedule or watering when the top 2 to 3 inches of soil is dry works best. This plant prefers to be underwatered than overwatered, so forgetting to water occasionally shouldn’t harm it. Make sure excess water drains out at the bottom of the pot to ensure deep watering reaches the roots.',
Lighting: 'This plant thrives in bright, indirect light but can also tolerate low-light conditions, making it very adaptable indoors. Place it less than 6 feet from a south-facing window to give it enough light to thrive. Avoid harsh direct sunlight, which can scorch its colorful leaves.',
Soil: 'Use a peat-based, well-draining potting mix formulated for indoor plants. A good mix is 3 parts potting soil to 1 part pumice or perlite to boost aeration and prevent root rot. Adding worm compost or organic compost can enrich the soil and provide extra nutrients.',
  },

{
    name: "Ecuador Philodendron",
    image: "PHILODENDRON VERRUCOSUM",
    plantId: 100,
  
    screen: "",
    description: 'The Ecuador Philodendron (Philodendron verrucosum) is a stunning climbing plant prized for its large, heart-shaped, deep green velvet leaves with a vibrant red underside. Native to the rainforests of South America, it brings a lush, exotic vibe to indoor spaces. It’s a climbing philodendron, so providing a moss pole or support will help it grow beautifully. This plant is toxic to cats and dogs, so keep it out of reach of pets. Easy to care for and visually striking, it’s an excellent choice for beginners and plant collectors alike.',

      care: { 
      waterFrequency: 7,
      lightFrequency: 1,
      fertilizerFrequency: 30,
      waterThreshold: 1,
      lightThreshold: 7,
      fertilizerThreshold: 1,
    } ,
 CareDifficulty: 'Difficult',
Watering: 'Allow the soil to dry out between waterings. If the leaves start to droop, it’s a sign the plant needs water. Let the soil reach about 90% dryness, then water thoroughly until it trickles out from the bottom of the pot. Philodendrons love consistent moisture but not soggy soil. Water when the first few inches of soil feel dry—typically once a week. Avoid letting the pot dry out completely to prevent plant stress.',
Lighting: 'Thrives in bright, indirect light. Too much direct sun can scorch the leaves and cause yellowing. Near an east-facing window is ideal. In their natural habitat, they grow in the forest canopy where light is filtered, so it’s best to mimic this soft, dappled light indoors.',
Soil: 'Use a fast-draining aroid potting mix that holds some moisture but drains well. Avoid sandy or muddy soils. A mix of potting soil + coco coir + orchid bark or peat moss gives good aeration and prevents the roots from sitting in stagnant water. The roots of Ecuador Philodendron naturally prefer well-aerated conditions.',
  },

{
    name: "Calathea Dottie",
    image: "CALATHEA DOTTIE",
    plantId: 101,
  
    screen: "",
    description: 'The Calathea Dottie (Calathea ornata) is admired for its dark green to almost black foliage elegantly lined with soft pink stripes, giving it a striking, tropical appearance. Native to the rainforests of the Amazon in South America, it naturally grows in shaded areas beneath tall trees, which explains its love for indirect light and humidity. This plant can grow up to 3 feet tall, making it a stunning statement piece indoors. While it can be a bit finicky, its dramatic leaves make the extra care worth it.',

       care: { 
      waterFrequency: 4,
      lightFrequency: 1,
      fertilizerFrequency: 30,
      waterThreshold: 2,
      lightThreshold: 7,
      fertilizerThreshold: 1,
    } ,
 CareDifficulty: 'Difficult',
Watering: 'Water once to twice a week or when the top 2 to 3 inches of soil has dried out. While tap water can be used, lukewarm rainwater or distilled water is ideal to prevent leaf damage. Drooping leaves usually indicate it’s time to water, while browning or yellowing may result from inconsistent watering. Remember: it’s easier to revive an underwatered Calathea than an overwatered one.',
Lighting: 'Thrives best in bright, indirect sunlight. Too much direct light can fade its vibrant colors and burn the leaves. If exposed to harsh sunlight, the plant may fold its leaves to protect itself.',
Soil: 'Calathea Pinstripe loves its soil moist but not soggy. Ensure proper drainage to avoid standing water that can lead to root rot.',
  },

{
    name: "Philodendron Subhastatum",
    image: "PHILODENDRON SUBHASTATUM",
    plantId: 102,
  
    screen: "",
    description: 'The Philodendron Subhastatum (Philodendron subhastatum) is a stunning climbing plant native to the rainforests of South America, particularly Colombia and Ecuador. It’s known for its rich green leaves with deep red or maroon undersides, creating a bold contrast that makes it a standout in any indoor plant collection. In ideal conditions, it can grow up to 6 feet tall and 24 inches wide, climbing onto supports or trellises as it reaches for light. Its tropical nature makes it love humidity and filtered sunlight, making it a great statement plant for homes and offices.',

     care: { 
      waterFrequency: 6,
      lightFrequency: 1,
      fertilizerFrequency: 30,
      waterThreshold: 1,
      lightThreshold: 7,
      fertilizerThreshold: 1,
    } ,
 CareDifficulty: 'Easy',
Watering: 'Philodendron Subhastatum loves moisture, so water it whenever the top 2 inches of soil feel dry. You can check this by touching the soil or using a moisture meter for accuracy. Avoid overwatering, as waterlogged soil can quickly lead to root rot.',
Lighting: 'Thrives best in bright, indirect light. Keep the plant away from harsh direct sunlight to prevent leaf burn. If placing near a sunny window, use a sheer curtain or shade cloth to soften the light. You can also rotate the plant regularly so all sides get even light exposure. Artificial grow lights can be used if natural sunlight is limited.',
Soil: 'Prefers a well-draining, rich organic soil made of equal parts loam, sand, and peat. Compost can be added for extra nutrients. Ideal soil pH is slightly acidic to slightly alkaline (5–8). Proper drainage is essential to avoid water retention.',
  },
{
    name: "Green Shield Alocasia",
    image: "ALOCASIA GREEN SHIELD",
    plantId: 103,
  
    screen: "",
    description: 'The Green Shield Alocasia (Alocasia clypeolata) is a striking tropical houseplant known for its glossy, shield-shaped leaves with deep green veins. Its waxy foliage and arching growth habit give a dramatic and elegant touch to indoor or outdoor spaces. This plant loves warm temperatures and high humidity, making it perfect for tropical climates. It originated from the rainforests of Mindanao, Philippines, and is ideal for adding color and texture to landscapes, patios, or interior plant displays.',

      care: { 
      waterFrequency: 5,
      lightFrequency: 1,
      fertilizerFrequency: 30,
      waterThreshold: 1,
      lightThreshold: 7,
      fertilizerThreshold: 1,
    } ,
 CareDifficulty: 'Moderate',
Watering: 'During the growing season, Green Shield Alocasia needs generous amounts of water due to its large, moisture-demanding leaves. For potted plants, spray or mist daily and water thoroughly when the top layer of soil is slightly dry. For outdoor plants, watering frequency depends on the weather. Avoid overwatering to prevent root rot and fungal issues.',
Lighting: 'Thrives best in filtered sunlight to partial shade. Direct sunlight can burn its leaves, while insufficient light can cause the stems to elongate and the leaves to become soft and droopy. Place it within 3 feet of a bright south-facing window indoors to maximize its growth potential.',
Soil: 'Not picky with soil type but grows best in loose, well-draining soil. Avoid water-retaining soils to prevent rot. A good potting mix would be peat moss or sandy soil combined with a small amount of organic fertilizer. If planted outdoors, ensure proper drainage.',
  },

{
    name: "Little Phil",
    image: "PHILODENDRON LITTLE PHIL",
    plantId: 104,
  
    screen: "",
    description: 'Little Phil (Philodendron ‘Phil01’) is a hybrid philodendron cultivar discovered by chance in 2009 in a commercial culture in Doonan, Queensland, Australia. This compact variety grows 30–50 cm tall, with short, sharp leaves that have reddish undersides. Occasionally, spontaneous mutations occur, producing variegated or elongated leaves. Little Phil is known for its strong root system and excellent basal branching, making it stable and easy to grow without a support pole. It’s a great choice for both homes and offices due to its manageable size and minimal care requirements.',

       care: { 
      waterFrequency: 6,
      lightFrequency: 1,
      fertilizerFrequency: 30,
      waterThreshold: 1,
      lightThreshold: 7,
      fertilizerThreshold: 1,
    } ,
 CareDifficulty: 'Moderate',
Watering: 'The Little Phil Philodendron needs regular watering about every 7–9 days, but the soil should dry out a bit between waterings. Water thoroughly until excess drains out of the bottom of the pot. Be careful not to overwater—yellow leaves are a sign of overwatering.',
Lighting: 'This plant is very adaptable to a wide range of light conditions. It thrives in medium to bright indirect light but can also tolerate low light. While philodendrons generally love sunlight, Little Phil can still do well even in shaded spaces.',
Soil: 'This cultivar needs well-draining, light soil with good aeration to avoid root rot. The best option is to use an aroid potting mix or a soilless medium with peat and perlite or vermiculite. This ensures proper air circulation while retaining enough moisture.',
  },
{
    name: "Jose Buono’s Philodendron",
    image: "PHILODENDRON JOSE BUONO",
    plantId: 105,
  
    screen: "",
    description: 'Jose Buono’s Philodendron (Philodendron ‘Jose Buono’) is a striking tropical climbing plant admired for its large, glossy green leaves splashed with bright yellow variegation. A member of the Araceae family, it originates from Colombia and the Caribbean region. In its natural environment, it can grow up to 10 feet (3 m) tall, while indoors it typically reaches around 4 feet (1.2 m). Its unique marbled foliage makes it a standout addition to any indoor plant collection. Though easy to care for, this plant is toxic to pets if ingested, so it’s best kept out of their reach.',

        care: { 
      waterFrequency: 6,
      lightFrequency: 1,
      fertilizerFrequency: 30,
      waterThreshold: 1,
      lightThreshold: 7,
      fertilizerThreshold: 1,
    } ,
 CareDifficulty: 'Moderate',
Watering: 'Water when the top inch (2–3 cm) of soil feels dry. Make sure to avoid overwatering to prevent root rot. It’s best to water deeply and allow the excess to drain out from the pot.',
Lighting: 'Prefers bright, indirect light to maintain its vibrant variegation. It can tolerate medium light but will produce less color. Avoid direct sunlight, as this can scorch its leaves.',
Soil: 'Use a well-draining, moisture-retaining, light, and aerating soil mix. A good blend includes moss, perlite, compost, pine bark, and activated charcoal. The ideal soil pH is between 6.1 and 7.3.',
  },
{
    name: "Corrugated Leaf Philodendron",
    image: "PHILODENDRON LUPINUM",
    plantId: 106,
  
    screen: "",
    description: 'Corrugated Leaf Philodendron (Philodendron lupinum) is a tropical climbing plant native to the Brazilian rainforest, particularly in the Acre region. It’s admired for its unique, textured, and corrugated leaves that give it a striking appearance. When grown indoors, it typically reaches 6 to 8 inches (15–20 cm) in height, making it a compact but eye-catching addition to any plant collection. This plant is toxic when ingested, so keep it away from children and pets. It’s also known by its other common name, Wolfish Tree-Hugger.',

       care: { 
      waterFrequency: 7,
      lightFrequency: 1,
      fertilizerFrequency: 30,
      waterThreshold: 1,
      lightThreshold: 7,
      fertilizerThreshold: 1,
    } ,
 CareDifficulty: 'Moderate',
Watering: 'Water once the top inch (2.5 cm) of soil has dried out. This plant is fairly drought-tolerant, so it won’t mind if you miss a watering schedule occasionally. It can even thrive in substrates like 100% sphagnum moss. To check if it’s time to water, do the finger test — if the soil feels dry at 1 inch deep, it’s time to water thoroughly. If it’s still moist, wait another day.',
Lighting: 'Prefers bright indirect light, but it can also tolerate low light conditions as long as there’s enough humidity. It’s great for spaces like bright bathrooms or areas with filtered sunlight.',
Soil: 'A well-draining soil mix with plenty of organic material is ideal. You can also grow it in 100% sphagnum moss or a 50/50 mix of sphagnum moss and perlite or vermiculite. The key is to keep it airy and well-draining to prevent root rot.',
  },
{
    name: "Stromanthe Triostar",
    image: "CALATHEA TRIOSTAR",
    plantId: 107,
  
    screen: "",
    description: 'Stromanthe Triostar (Stromanthe sanguinea), also commonly referred to as Calathea Triostar, is a stunning prayer plant known for its long, colorful leaves with shades of green, cream, pink, and red underneath. Native to the Amazon jungle in South America, this plant grows under dense forest canopies where it enjoys indirect light and high humidity. Its nickname “Prayer Plant” comes from nyctinasty, a process where the leaves open during the day to absorb light and fold upward at night, as if in prayer. While it can be a bit finicky, its vibrant, book-page–like foliage makes it a favorite among houseplant enthusiasts.',

       care: { 
      waterFrequency: 4,
      lightFrequency: 1,
      fertilizerFrequency: 30,
      waterThreshold: 2,
      lightThreshold: 7,
      fertilizerThreshold: 1,
    } ,
 CareDifficulty: 'Moderate',
Watering: 'Water once to twice a week or when the top inch of soil has dried out. This plant loves humidity, so misting between waterings helps keep it happy. Tepid rain or distilled water is best, but regular water works too. Drooping leaves may mean the plant is thirsty, while browning or yellowing can be caused by inconsistent watering. Remember: underwatering is easier to fix than overwatering.',
Lighting: 'Thrives in bright, indirect light. Direct sunlight can burn the leaves or cause them to fold up for protection. Keep it in a bright, shaded area to maintain its vibrant colors.',
Soil: 'Prefers well-draining, breathable, and light soil. A peat-based mix works best, as it retains moisture but allows the roots to breathe. Mixing in perlite helps improve drainage and prevents sogginess.',
  },
{
    name: "Busy Lizzy",
    image: "BUSY LIZZIE",
    plantId: 108,
  
    screen: "",
    description: 'Busy Lizzy (Impatiens walleriana), also known as Common Impatiens, Garden Impatiens, Patience Plant, and Sultan’s Flower, is a herbaceous flowering plant from the Balsaminaceae family. Native to East Africa—specifically Kenya, Mozambique, Tanzania, and Zimbabwe—it thrives in wet tropical climates. This fast-growing subshrub typically reaches 0.5 to 2 feet tall with an equally wide spread. It features pale red to dark green serrated leaves and single or double blooms in a wide variety of colors (except blue and yellow). After flowering, it produces a capsule-shaped fruit that releases tiny seeds when ripe. Busy Lizzy prefers warm, bright, and humid environments, making it a favorite in indoor gardens and shaded outdoor beds. Pet Safe: Non-toxic to cats and dogs.',

        care: { 
      waterFrequency: 3,
      lightFrequency: 1,
      fertilizerFrequency: 30,
      waterThreshold: 2,
      lightThreshold: 7,
      fertilizerThreshold: 1,
    } ,
 CareDifficulty: 'Moderate',
Watering: 'Keep the soil consistently moist but not soggy. During the growing season, Busy Lizzy drinks a lot, so water as soon as the top layer of soil begins to dry out. If the soil dries out completely, the buds may drop and leaf edges can wilt.',
Lighting: 'This plant loves bright, soft light but should be protected from harsh direct sun. The eastern window is an ideal spot. In winter, supplemental lighting is recommended to give it about 14 hours of daylight. Reduce the light intensity slightly during dormancy.',
Soil: 'A well-draining potting soil is ideal. You can use store-bought universal soil or make your own slightly acidic mix: 3 parts leaf or soggy soil + 1 part perlite or sand. Adding a drainage layer (expanded clay or charcoal) at the bottom of the pot prevents root rot.',
  },
{
    name: "Poinsettia",
    image: "POINSETTIA",
    plantId: 109,
  
    screen: "",
    description: 'Poinsettia (Euphorbia pulcherrima), also called Mexican flameleaf or Christmas star, is a perennial shrub native to Mexico and Central America. In its natural environment, it can grow between 2 to 13 feet (0.5–4 m) tall. What most people think are “flowers” are actually bracts—vivid red modified leaves designed to attract pollinators to the tiny yellow true flowers at the center.',

      care: { 
      waterFrequency: 5,
      lightFrequency: 1,
      fertilizerFrequency: 45,
      waterThreshold: 1,
      lightThreshold: 7,
      fertilizerThreshold: 1,
    } ,
 CareDifficulty: 'Moderate',
Watering: 'Poinsettias need a careful watering routine. From January to March, water when the topsoil feels dry. Starting April, gradually reduce watering, letting the soil dry out between each hydration. Be careful not to let the stem shrivel, as this indicates stress or decline.',
Lighting: 'Poinsettias love bright, indirect light and require around 12–14 hours of it daily. Avoid harsh direct sunlight, which can burn the leaves.',
Soil: 'Use loamy, well-draining soil with a pH of 5.8 to 6.2. A ready-to-use potting mix works best for this plant.',
  },
{
    name: "Philodendron Moonlight",
    image: "PHILODENDRON MOONLIGHT",
    plantId: 110,
  
    screen: "",
    description: 'Commonly known as Philodendron Moonlight or Lime Philodendron, this plant is a self-heading philodendron native to Central and South America. Its standout feature is its glossy, color-changing leaves that emerge neon yellow and mature to a bright, vivid green. The stems and unopened leaves often have a pink tint, adding extra visual appeal. This variety doesn’t climb or trail—it grows upright from a thick central stem, reaching a typical height of about 50 cm. Philodendron Moonlight is toxic to both pets and humans if ingested. Keep it out of reach of children and animals.',

        care: { 
      waterFrequency: 6,
      lightFrequency: 1,
      fertilizerFrequency: 30,
      waterThreshold: 1,
      lightThreshold: 7,
      fertilizerThreshold: 1,
    } ,
 CareDifficulty: 'Moderate',
Watering: 'Philodendron Moonlight prefers consistently moist soil but should not sit in waterlogged conditions. It’s best to check the soil moisture regularly by inserting your finger into the top layer rather than following a strict schedule. Water when the top inch of soil feels dry, especially during the growing season.',
Lighting: 'This plant thrives in bright, indirect light, ideally near an east-facing window or a few feet away from west or south-facing windows. Avoid direct sunlight, as it can burn the leaves and hinder growth.',
Soil: 'Plant in a loose, rich potting mix with good drainage. A mix containing peat moss or coconut coir combined with perlite or pumice works well. A pre-mixed aroid soil blend is also suitable.',
  },
{
    name: "Philodendron Xanadu ",
    image: "PHILODENDRON XANADU",
    plantId: 111,
  
    screen: "",
    description: 'Commonly known as Philodendron Xanadu, botanically called Thaumatophyllum xanadu, this tropical plant from Brazil is loved for its lush, glossy green foliage and dense, bushy growth habit. It makes an excellent indoor ornamental plant due to its low-maintenance nature and ability to adapt to different light conditions. Philodendron Xanadu is toxic to both pets and humans if ingested, so keep it out of reach of children and animals.',

      care: { 
      waterFrequency: 7,
      lightFrequency: 1,
      fertilizerFrequency: 30,
      waterThreshold: 1,
      lightThreshold: 7,
      fertilizerThreshold: 1,
    } ,
 CareDifficulty: 'Moderate',
Watering: 'Allow the soil to almost completely dry out between waterings, then water thoroughly until excess water drains from the bottom of the pot. Always plant in a pot with drainage holes and ensure no standing water remains. Like most philodendrons, it’s better to underwater than overwater, as soggy roots can lead to root rot.',
Lighting: 'Thrives in bright, indirect light, but can also tolerate short periods of low light. Avoid prolonged exposure to harsh, direct sunlight, as this can burn the leaves.',
Soil: 'Use a rich, airy, and well-draining soil mix that still retains slight moisture. A blend of indoor potting soil, perlite, and orchid bark (in equal parts) works great. A ready-made aroid mix is also suitable.',
  },

  

    
];



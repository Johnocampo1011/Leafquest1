import React, { useState } from 'react';
import { View,Text,StyleSheet,Image,ScrollView,TextInput,TouchableOpacity, Platform, Dimensions} from 'react-native';
import { useNavigation,useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export function LibraryScreen({ navigation }) {
  const items = [
  {
    id: 0,
    src: require('./assets/POTHOS.png'),
    screen: 'PlantDetails',
    label: 'GOLDEN POTHOS',
    description: "Size: Vines 6 to 10 feet long.\n\nWater: Allow the top inch of soil to dry out between watering.\n\nFertilize: Light feeders, so use a balanced liquid fertilizer every 1 to 3 months.\n\nDescription:\n   One of the easiest houseplants to grow. This tropical vine comes in a variety of foliage colors and patterns. Pothos can be trimmed and kept compact, allowed to trail from hanging baskets, or trained up vertical supports. This herbaceous perennial, broadleaf evergreen houseplant belongs to the arum family (Araceae) and is native to the Society Islands. It's often called Devil's Ivy or Golden Pothos due to its ability to thrive even with neglect. Pothos has medium severity poison characteristics.",
  },

  {
    id: 1,
    src: require('./assets/HEARTLEAF PHILODENDRON.png'),
    screen: 'PlantDetails',
    label: 'HEARTLEAF PHILODENDRON',
    description: "Size: Vines to 8 feet long.\n\nWater: Prefers evenly moist soil, but not soggy. Water if top inch of soil is dry.\n\nFertilize: Apply a water-soluble houseplant fertilizer from spring through fall.\n\nDescription:\n   Another very easy-to-grow houseplant, similar to pothos. Tolerates low light, but will grow faster in medium to bright light. Foliage comes in a variety of sizes, shapes, and colors. Philodendrons can also be grown outdoors in mild climates. Philodendrons are tropical evergreen perennials native to Central and South America, belonging to the same family as pothos plants (Araceae). There are hundreds of philodendron species, categorized as either vining or non-climbing. Vining types have aerial roots and are excellent for hanging baskets or climbing. Philodendrons are considered mildly poisonous to people and pets if ingested, containing calcium oxalate crystals that can cause irritation.",
  },
  
  {
    id: 2,
    src: require('./assets/BIRDS NEST FERN.png'),
    screen: 'PlantDetails',
    label: "BIRD'S NEST FERN",
    description: "Size: Up to 2 feet tall.\n\nWater: Keep soil evenly moist, but not soggy. Water at the edge of the rosette so water doesn't pool in the center and cause rot. Yellow leaves signal overwatering.\n\nFertilize: Fertilize every 2 to 4 weeks from spring until fall with a diluted houseplant fertililzer.\n\nDescription:\n   This tropical fern makes a stunning centerpiece for a table or plant stand. New fronds unfurl from the center of the plant, so the shape remains elegant and upright. An ideal plant for a steamy bathroom, bird's nest ferns like moderate humidity and temperatures around 70 degrees F. The scientific name is Asplenium nidus, and it is an epiphytic species of fern in the family Aspleniaceae. It is native to tropical southeastern Asia, eastern Australia, Hawaii, Polynesia, Christmas Island, India, and eastern Africa. Epiphytic means it naturally grows on the surface of another plant.",
  },
  {
    id: 3,
    src: require('./assets/ZZ RAVEN.png'),
    screen: 'PlantDetails',
    label: 'ZZ RAVEN',
    description: "Size: 2 to 3 feet tall.\n\nWater: Allow the soil to dry out completely between waterings, as it stores water in its rhizomes. Overwatering is a common issue.\n\nFertilize: Fertilize sparingly, every 3-4 months during the growing season with a balanced liquid fertilizer. \n\nDescription:\n   The ZZ Raven Plant is a distinctive cultivar of the ZZ plant, also known as Zamioculcas zamiifolia Raven. Its most striking feature is its foliage, which emerges in a vibrant lime-green color and gradually matures to a deep, almost black, glossy hue. Like the classic ZZ plant, 'Raven' is exceptionally hardy and tolerant of neglect, thriving in low to bright indirect light and requiring infrequent watering due to its drought-tolerant nature. This makes it an excellent choice for beginners or those seeking a low-maintenance, unique-looking plant.",
    
  },
 {
    id: 4,
    src: require('./assets/ANTHURIUM.png'),
    screen: 'PlantDetails',
    label: 'ANTHURIUM',
    description: "Size: 1 to 3 feet tall and wide.\n\n\Water: Keep the soil consistently moist but not soggy. Allow the top inch of soil to dry out between waterings.\n\nFertilize: Fertilize every 6-8 weeks during the growing season with a diluted liquid houseplant fertilizer.\n\nDescription:\n   Anthuriums are tropical evergreen plants native to the rainforests of Central and South America. They are widely cultivated for their striking, heart-shaped, waxy flowers, which are actually modified leaves called spathes. These spathes come in brilliant shades of red, pink, white, or purple, and typically surround a prominent, cylindrical spadix. Anthuriums thrive in bright, indirect light and require high humidity, making them ideal for bathrooms or kitchens with good natural light.",
  },
{
    id: 5,
    src: require('./assets/ARECA PALM.png'),
    screen: 'PlantDetails',
    label: 'ARECA PALM',
    description: "Size: Can reach 6 to 12 feet tall indoors.\n\nWater: Keep soil consistently moist but not soggy during the growing season; allow the top inch to dry out between waterings in winter.\n\nFertilize: Fertilize monthly during spring and summer with a liquid houseplant fertilizer diluted to half strength.\n\nDescription:\n   The Areca Palm, also known as Butterfly Palm, is a popular houseplant recognized for its graceful, feathery fronds that emerge from multiple cane-like stems. Native to Madagascar, it contributes to a tropical aesthetic indoors and can act as a natural air humidifier. This palm prefers bright, indirect light and can suffer from brown tips if humidity is too low or if it experiences inconsistent watering. It is a slow to moderate grower, typically adding 6-10 inches of height per year.",
  },
{
    id: 6,
    src: require('./assets/BOSTON FERN.png'),
    screen: 'PlantDetails',
    label: 'BOSTON FERN',
    description: "Size: 2 to 3 feet tall and wide.\n\nWater: Keep the soil consistently moist but not soggy. Avoid letting the soil dry out completely.\n\nFertilize: Fertilize monthly during the growing season (spring through fall) with a diluted liquid houseplant fertilizer.\n\nDescription:\n   The Boston Fern is a classic and popular houseplant, celebrated for its arching, bright green fronds. Native to tropical and subtropical regions worldwide, it typically grows epiphytically or terrestrially in humid environments. This fern requires high humidity to prevent its delicate fronds from drying out and turning brown; regular misting or placement near a humidifier is beneficial. It prefers bright, indirect light and consistent temperatures to maintain its lush appearance.",
  },
{
    id: 7,
    src: require('./assets/CHRISTMAS CACTUS.png'),
    screen: 'PlantDetails',
    label: 'CHRISTMAS CACTUS',
    description: "Size: 6 to 12 inches tall, with cascading stems.\n\nWater: Water when the top inch of soil is dry. Reduce watering after blooming.\n\nFertilize: Fertilize every 2-4 weeks during spring and summer with a balanced liquid fertilizer; cease fertilizing in early fall to encourage blooming.\n\nDescription:\n   The Christmas Cactus is an epiphytic succulent native to the coastal mountains of southeastern Brazil. Unlike desert cacti, it grows in humid forests, often on trees or rocks, and is characterized by its flattened, segmented stems. This plant is renowned for its vibrant, tubular flowers that bloom in late fall or early winter, making it a popular holiday plant. Flowers can be pink, red, white, orange, or purple. It thrives in bright, indirect light and cool temperatures (around 50-55°F or 10-13°C) in the fall to initiate blooming.",
  },
  {
    id: 8,
    src: require('./assets/DIEFFENBACHIA.png'),
    screen: 'PlantDetails',
    label: 'DIEFFENBACHIA',
    description: "Size: 2 to 6 feet tall.\n\nWater: Keep the soil consistently moist but not soggy. Allow the top inch of soil to dry slightly before rewatering.\n\nFertilize: Fertilize monthly during the growing season (spring and summer) with a balanced liquid houseplant fertilizer.\n\nDescription:\n   Dieffenbachia, often called Dumb Cane, is a tropical perennial native to the rainforests of Central and South America. It is highly valued for its large, broad, oblong leaves that come in striking patterns of green, cream, and yellow variegation. While an attractive foliage plant, all parts of the Dieffenbachia contain calcium oxalate crystals, which can cause irritation and temporary swelling of the tongue and throat if ingested, hence its common name 'Dumb Cane'. It thrives in medium to bright indirect light and appreciates consistent humidity.",
  },
  {
    id: 9,
    src: require('./assets/DRACAENA.png'),
    screen: 'PlantDetails',
    label: 'DRACAENA',
    description: "Size: Varies greatly by species, from 1 to 10 feet tall indoors.\n\nWater: Allow the top inch or two of soil to dry out between waterings. Avoid overwatering, which can lead to root rot.\n\nFertilize: Fertilize every 2-4 weeks during the growing season (spring and summer) with a balanced liquid houseplant fertilizer.\n\nDescription:\n   Dracaena is a diverse genus of evergreen trees and shrubs native to Africa, Asia, and Central America, encompassing many popular indoor plant species like Dracaena fragrans (Corn Plant) and Dracaena marginata (Dragon Tree). These plants are valued for their upright growth habit and sword-like or strap-shaped leaves, which often feature vibrant variegation. Dracaenas are known for their resilience and ability to tolerate a range of indoor conditions, making them excellent choices for beginners.",
  },
   {
    id: 10,
    src: require('./assets/FITTONIA.png'),
    screen: 'PlantDetails',
    label: 'FITTONIA',
    description: "Size: 6 to 12 inches tall with a spreading habit.\n\nWater: Keep the soil consistently moist but not waterlogged. Fittonia is prone to wilting if allowed to dry out completely.\n\nFertilize: Fertilize monthly during the growing season with a diluted liquid houseplant fertilizer.\n\nDescription:\n   Fittonia, commonly known as Nerve Plant or Mosaic Plant, is a tropical evergreen perennial native to the rainforests of South America. It is prized for its intricate, contrasting vein patterns that stand out against its green leaves, available in shades of white, pink, or red. This low-growing plant thrives in high humidity and warm temperatures, making it an excellent choice for terrariums or humid bathroom environments. Fittonia can be a bit dramatic, often wilting rapidly when thirsty, but typically revives quickly after watering.",
  },
   {
    id: 11,
    src: require('./assets/GUZMANIA.png'),
    screen: 'PlantDetails',
    label: 'GUZMANIA',
    description: "Size: 1 to 2 feet tall, including flower stalk.\n\nWater: Keep the central cup (tank) filled with distilled or rainwater, flushing it out every few weeks. Water the soil sparingly.\n\nFertilize: Fertilize lightly by adding a diluted liquid fertilizer to the central cup or spraying it on the leaves.\n\nDescription:\n   Guzmania is a genus of epiphytic bromeliads native to the tropical rainforests of Central and South America. These plants are grown for their vibrant, long-lasting inflorescences, which are actually colorful bracts (modified leaves) that surround inconspicuous, true flowers. The bracts can display brilliant shades of red, orange, yellow, or pink, providing a stunning pop of color. As epiphytes, Guzmanias primarily absorb water and nutrients through their leaves, especially through the central cup formed by their rosette of foliage.",
  },
 {
    id: 12,
    src: require('./assets/HOYA.png'),
    screen: 'PlantDetails',
    label: 'HOYA',
    description: "Size: Vines can reach 6 to 10 feet long.\n\nWater: Allow the soil to dry out completely between waterings. Overwatering can lead to root rot.\n\nFertilize: Fertilize sparingly, every 2-4 weeks during the growing season, with a diluted liquid fertilizer.\n\nDescription:\n   Hoya carnosa, commonly known as Wax Plant or Porcelain Flower, is a popular evergreen vining plant native to East Asia and Australia. It is cherished for its thick, waxy, succulent-like leaves and its clusters of fragrant, star-shaped flowers that often appear waxy or porcelain-like. The flowers frequently produce a sweet, sticky nectar. Hoyas are relatively low-maintenance, drought-tolerant, and prefer bright, indirect light, making them excellent choices for hanging baskets or training on a trellis.",
  },
  {
    id: 13,
    src: require('./assets/LUCKY BAMBOO.png'),
    screen: 'PlantDetails',
    label: 'LUCKY BAMBOO',
    description: "Size: Varies widely based on training, typically 6 inches to 3 feet tall.\n\nWater: If grown in water, change the water weekly. If grown in soil, keep it consistently moist but not waterlogged.\n\nFertilize: Fertilize sparingly; a very diluted liquid fertilizer every couple of months is sufficient for soil-grown plants, while water-grown plants may benefit from a specialized lucky bamboo fertilizer.\n\nDescription:\n   Lucky Bamboo is not a true bamboo but a species of Dracaena, native to Cameroon in West Africa. It is often cultivated for its ornamental value, with stems that can be trained into intricate spirals, braids, or tiers. This plant is remarkably tolerant of low light conditions and can be grown purely in water, provided the roots are submerged. It is a popular gift and feng shui element, believed to bring good fortune to the household.",
  },
  {
    id: 14,
    src: require('./assets/ORCHID.png'),
    screen: 'PlantDetails',
    label: 'ORCHID',
    description: "Size: Typically 1 to 3 feet tall, with flower spikes reaching higher.\n\nWater: Water when the potting medium is dry to the touch, often every 7-10 days. Avoid overwatering.\n\nFertilize: Use a balanced orchid fertilizer diluted to half strength every 2-4 weeks, especially during active growth.\n\nDescription:\n   Phalaenopsis orchids, commonly known as Moth Orchids, are epiphytic plants native to tropical Asia and Australia. They are characterized by their flattened, fleshy leaves and long-lasting, showy flowers that emerge from an arching stem. These orchids thrive in bright, indirect light conditions and prefer high humidity. Their roots are adapted to absorb moisture and nutrients from the air and rain, which is why they are often grown in bark or sphagnum moss rather than traditional soil.",
  },
  {
    id: 15,
    src: require('./assets/SCHEFFLERA.png'),
    screen: 'PlantDetails',
    label: 'SCHEFFLERA',
    description: "Size: Can grow 4 to 8 feet tall indoors.\n\nWater: Water thoroughly when the top inch or two of soil feels dry. Allow excess water to drain to prevent root rot.\n\nFertilize: Fertilize every 2-4 weeks during the growing season with a balanced liquid houseplant fertilizer.\n\nDescription:\n   Schefflera arboricola, commonly called Dwarf Umbrella Tree, is a popular evergreen shrub native to Taiwan. It is characterized by its glossy, oval leaflets that radiate outwards from a central point, forming an umbrella-like cluster. This plant is known for its relatively easy care and adaptability, thriving in medium to bright indirect light. While it can grow quite large indoors, it can be pruned to maintain a desired size and shape, making it a versatile choice for various indoor spaces.",
  },
   {
    id: 16,
    src: require('./assets/STRELITZIA.png'),
    screen: 'PlantDetails',
    label: 'STRELITZIA',
    description: "Size: Can reach 3 to 6 feet tall indoors.\n\nWater: Keep soil consistently moist during the growing season; allow the top few inches to dry out before rewatering. Reduce watering in winter.\n\nFertilize: Fertilize monthly during spring and summer with a balanced liquid houseplant fertilizer.\n\nDescription:\n   Strelitzia reginae, commonly known as Bird of Paradise, is a stunning evergreen perennial native to South Africa. It is named for its exotic, crane-like flowers, which feature vibrant orange sepals and blue petals, resembling a bird in flight. This plant also boasts large, paddle-shaped, blue-green leaves that resemble those of a banana plant. Indoors, the Bird of Paradise requires bright, direct to indirect sunlight and ample space to accommodate its size. While it can take several years to bloom, its dramatic foliage alone makes it a popular ornamental plant.",
  },
{
    id: 17,
    src: require('./assets/ALOCASIA.png'),
    screen: 'PlantDetails',
    label: 'ALOCASIA',
    description: "Size: 2 to 6 feet tall and wide, depending on variety\n\nWater: Water regularly during the growing season (spring through fall) to keep the soil evenly moist, but not soggy; less frequently during winter.\n\nFertilize: Feed with a diluted liquid houseplant fertilizer one to two times per month during spring and summer.\n\nDescription:\n   Given the right conditions, these lush and leafy tropical plants can thrive indoors in well-lit areas, making them a bold focal point of any sunny room. In addition to bright light, alocasias also require a humid environment, so keep plants well-hydrated by using a humidifier or misting the leaves regularly. Also called Elephant Ear Plant or African Mask Plant, Alocasias have large, dark-green, glossy, heart-shaped leaves with wavy edges. Their leaves can come in red, bronze, blue-green, and purple. Alocasias are poisonous and should be kept away from pets and children.",
  },
  {
    id: 18,
    src: require('./assets/ALOE.png'),
    screen: 'PlantDetails',
    label: 'ALOE',
    description: "Size: 12 to 24 inches tall\n\nWater: Water deeply, but not too often, allowing the soil to dry to a depth of 1 to 2 inches between watering.\n\nFertilize: Aloes generally don't require fertilizing.\n\nDescription:\n   Aloes prefer tight quarters and keeping them slightly root bound may help promote blooming, which doesn't always happen when they are grown indoors. Grow them in a sandy, well-drained soil such as a cactus potting mix. Aloe is a cactus-like plant that grows in hot, dry climates. Historically, it was used for skin conditions and was thought to promote wound healing. Aloe products can be made from the gel (inner leaf), latex (outer layer), or whole crushed leaf. The International Agency for Research on Cancer has classified whole leaf extract of aloe vera as a possible carcinogen in humans.",
  },
  {
    id: 19,
    src: require('./assets/HAWORTHIA.png'),
    screen: 'PlantDetails',
    label: 'HAWORTHIA',
    description: "Size: 3 to 5 inches tall\n\nWater: Allow the soil to dry out completely between waterings.\n\nFertilize: Infrequently, with a slow-release product.\n\nDescription:\n   Ideal for narrow windowsills, the slow-growing succulent remains neat and compact. In summer, creamy white flowers bloom on long stems. Haworthias need almost no care and rarely need repotting. Haworthias are small succulents native primarily to South Africa. They are closely related to aloes and are in the aloe family, Aloaceae. The genus is named after Adrian Hardy Haworth, a British botanist and entomologist.",
  },
{
    id: 20,
    src: require('./assets/JADE PLANT.png'),
    screen: 'PlantDetails',
    label: 'JADE PLANT',
    description: "Size: Dwarf varieties, 12 to 18 inches tall.\n\nWater: Allow the soil to dry out between waterings, and water only sparingly in the winter months. Too much moisture can cause stem and root rot.\n\nFertilize: Only occasionally with a diluted liquid fertilizer from spring through early fall.\n\nDescription:\n   Jade plants can live for decades and are easy to propagate from leaf or stem cuttings. Let the cuttings dry out for a few days and then stick them in a good potting mix, preferably one for cactus and succulents. Also known as lucky plant, money plant, or money tree, the jade plant is a succulent plant with small pink or white flowers. It is native to the KwaZulu-Natal and Eastern Cape provinces of South Africa, and Mozambique.",
  },
  {
    id: 21,
    src: require('./assets/KALANCHOE.png'),
    screen: 'PlantDetails',
    label: 'KALANCHOE',
    description: "Size: Up to 12 inches tall\n\nWater: Water every week or so when the soil feels dry.\n\nFertilize: Once or twice a year, in early spring and late autumn. Plants in bloom do not need fertilizing.\n\nDescription:\n   When kalanchoes bloom, the flowers can last for several weeks. To encourage reblooming, pinch off spent flowers and give the plant a rest period with no fertilizing and minimal watering. After a month or so, new buds should begin to form. Also known as Florist Kalanchoe, Flaming Katy, Christmas Kalanchoe, or Madagascar Widow's Thrill, this popular flowering succulent is native to Madagascar. It is admired for its striking, long-lasting blooms and glossy, dark green leaves.",
  },
  {
    id: 22,
    src: require('./assets/SNAKE PLANT.png'),
    screen: 'PlantDetails',
    label: 'SNAKE PLANT',
    description: "Size: 6 to 20 inches tall.\n\nWater: Allow the top inch of soil to dry completely before watering. Snake plants store water, so it's almost impossible to underwater them.\n\nFertilize: Not necessary, but an occasional dose of all-purpose houseplant food during the spring and summer will encourage more vigorous growth.\n\nDescription:\n   Also called mother-in-law's tongue, this hardy houseplant is almost impossible to kill. Although it prefers bright light, it will also persevere through dim lighting, temperature fluctuations, and lapses in watering. Snake plants were historically a recognized genus but are now included in Dracaena based on molecular phylogenetic studies. Common names include mother-in-law's tongue, devil's tongue, and bowstring hemp. Hard-leaved species typically originate from arid climates and have adaptations like thick, succulent leaves for water storage, while soft-leaved species are from tropical regions. According to a NASA Clean Air Study, Dracaena trifasciata (a former Sansevieria species) can purify air by removing pollutants like formaldehyde, xylene, and toluene.",
  },
  {
    id: 23,
    src: require('./assets/SPIDER PLANT.png'),
    screen: 'PlantDetails',
    label: 'SPIDER PLANT',
    description: "Size: 6 to 8 inches tall, with cascading runners\n\nWater: Water generously when the soil feels dry; more sparingly in winter.\n\nFertilize: Monthly during the active growing season, early spring to late autumn.\n\nDescription:\n   One of the easiest plants to propagate. Simply cut the baby spiders from their runners and place in moist potting soil. You can also stick them in a glass of water for a week or so until roots form and then pot in fresh soil. One of the easiest plants to propagate, spider plants produce 'plantlets' or 'spiderettes' on long runners. These can be easily cut and rooted in moist soil or water.",
  },
  {
    id: 24,
    src: require('./assets/CROTON.png'),
    screen: 'PlantDetails',
    label: 'CROTON',
    description: "Size: Typically 2 to 6 feet tall indoors.\n\nWater: Keep the soil consistently moist during the growing season, but allow the top inch to dry slightly before rewatering. Reduce watering in winter.\n\nFertilize: Fertilize every 2-4 weeks during spring and summer with a balanced liquid houseplant fertilizer.\n\nDescription:\n   Croton plants are striking broadleaf evergreens native to Malaysia, Australia, and the western Pacific Islands, where they grow as shrubs or small trees. Their most notable feature is their exceptionally colorful foliage, displaying vivid combinations of red, orange, yellow, green, and even black, often in bold patterns. To maintain their intense leaf coloration, Crotons require abundant bright, indirect sunlight. They also prefer warm temperatures and high humidity, making them somewhat sensitive to cold drafts and dry air.",
  },
   {
    id: 25,
    src: require('./assets/CAST IRON PLANT.png'),
    screen: 'PlantDetails',
    label: 'CAST IRON PLANT',
    description: "Size: 15 to 24 inches tall.\n\nWater: Water moderately in spring and summer, less often in fall and winter. Allow the soil to dry between watering.\n\nFertilize: Once a month from spring through fall.\n\nDescription:\n   Cast iron plants are extremely slow growing and can take years to reach their full height. Cast iron plants are almost impervious to neglect and aptly named for their tough-as-nails constitution. A good choice for dimly lit rooms and rooms with northern exposure. This evergreen perennial is native to Asia. Its common name reflects its resilience; it can grow in deep shade and withstand drought.",
  },
{
    id: 26,
    src: require('./assets/CHINESE EVERGREEN.png'),
    screen: 'PlantDetails',
    label: 'CHINESE EVERGREEN',
    description: "Size: 2 to 3 feet tall.\n\nWater: Keep soil evenly moist, but not soggy. Reduce water in the winter when plant growth slows. Wilted leaves are a sign of underwatering; overwatering may cause stem or root rot.\n\nFertilize: Monthly with a diluted liquid fertilizer from early spring through fall.\n\nDescription:\n   Chinese evergreens hate cold drafts and temperatures below 55 degrees Farenheit. Locate your plant away from drafty doorways, windows, and air-conditioning vents. Plants with darker green leaves can tolerate less light, while variegated varieties prefer brighter light. Aglaonema is native to the tropical and subtropical rainforests of Asia and New Guinea, where it thrives under dense forest canopies. It is a perennial evergreen, primarily grown for its ornamental foliage. Chinese evergreen plants are mildly toxic to humans, cats, dogs, and horses, with all parts containing calcium oxalate crystals.",
  },
  {
    id: 27,
    src: require('./assets/PARLOR PALM.png'),
    screen: 'PlantDetails',
    label: 'PARLOR PALM',
    description: "Size: 2 to 4 feet tall.\n\nWater: Avoid overwatering, but keep the soil evenly moist. Water when the surface of the soil feels dry.\n\nFertilize: Fertilize monthly in spring and summer.\n\nDescription:\n   Bring tropical flair indoors with a parlor palm. A popular choice for dimly lit foyers and offices. Typically the only pruning needed is the removal of lower fronds that naturally turn brown over time. Trimming healthy green fronds will stop growth completely. If you do prune, remove the entire stem. Also known as neanthe bella palm, this small, compact palm is typically single-trunked and native to rainforests from southeastern Mexico to northern Guatemala.",
  },
  {
    id: 28,
    src: require('./assets/PEACE LILY.png'),
    screen: 'PlantDetails',
    label: 'PEACE LILY',
    description: "Size: 1 to 6 feet tall.\n\nWater: Keep soil evenly moist, but not soggy. Don't allow the soil to dry out completely. Reduce water in the winter when plant growth slows.\n\nFertilize: Apply a water-soluble houseplant fertilizer at half strength every two months.\n\nDescription:\n   Pure white spathes surrounding creamy white flower spikes bloom from mid-spring through late summer. Peace lilies love warmth and humidity. Avoid exposing them to temperatures below 55 degrees F. Despite its common name, the Peace Lily is not a true lily but a member of the Araceae family, which also includes caladiums and elephant ears. It is a tropical, evergreen plant native to Central and Southern America. The plant is mildly toxic; all parts contain calcium oxalate, which may cause stomach or respiratory irritation if consumed in large amounts. It is known for its air-purifying qualities, as identified by a NASA Clean Air Study.",
  },
  {
    id: 29,
    src: require('./assets/PRAYER PLANT.png'),
    screen: 'PlantDetails',
    label: 'PRAYER PLANT',
    description: "Size: Up to 3 feet tall.\n\nWater: Keep evenly moist. Don't allow to become overly soggy or dry out completely. May be sensitive to tap water, so use distilled or filtered water.\n\nFertilize: Once a month from spring through fall.\n\nDescription:\n   Also called rattlesnake plant, peacock plant, or zebra plant, this popular houseplant is grown for its decorative foliage in an assortment of patterns, colors, and shapes. Prayer plants don't like their roots disturbed, so repot in early spring only if rootbound. Formerly, about 200 species assigned to Calathea are now in the genus Goeppertia; Calathea currently contains around 60 species. These plants are native to the tropical Americas. Their leaves exhibit nyctinasty, folding up at night and unfurling in the morning, a process enabled by a small joint called a pulvinus. Calatheas are sensitive to minerals like chlorine and fluoride found in tap water.",
  },
   {
    id: 30,
    src: require('./assets/AFRICAN VIOLET.png'),
    screen: 'PlantDetails',
    label: 'AFRICAN VIOLET',
    description: "Size: Usually under 4 inches tall.\n\nWater: Water when soil feels slightly dry to the touch. Try not get the leaves wet, which can cause spotting.\n\nFertilize: Apply a specialized African violet fertilizer every 2 to 3 weeks, or according to package directions.\n\nDescription:\n   Thousands of cultivars give you a choice of almost any flower color, as well as single, double, and bicolored blooms. African violets will bloom repeatedly during spring and summer when given enough sunlight, with the blooms lasting up to a few weeks. African violets are low, compact plants that typically grow in a rosette form. They have thick, hairy green leaves and stems with velvety flowers, usually five petals (two smaller at the top, three larger at the bottom) and yellow centers. The genus Saintpaulia was named after the Swedish physician and botanist Elias Tillandz.",
  },
  {
    id: 31,
    src: require('./assets/AIR PLANT.png'),
    screen: 'PlantDetails',
    label: 'AIR PLANT',
    description: "Size: Varies, depending on the variety.\n\nWater: Run the plants under water a few times a week. If the leaves are curled more than normal, submerge in a bowl of water overnight.\n\nFertilize: Use an epiphyte fertilzer spray weekly, or according to package directions.\n\nDescription:\n   Air plants put down no roots and receive nutrients and moisture through their leaves. Once an air plant blooms, it will produce offshoots that will become new plants in one to two years. illandsia is a genus of around 650 species of evergreen, perennial flowering plants in the family Bromeliaceae, native to the Neotropics. Most species are epiphytes, meaning they grow on other plants, but some are aerophytes, growing on shifting desert soil. They use crassulacean acid metabolism (CAM) to photosynthesize, closing their stomata during the day to prevent water loss and opening them at night to absorb carbon dioxide.",
  },
 {
    id: 32,
    src: require('./assets/FIDDLE LEAF.png'),
    screen: 'PlantDetails',
    label: 'FIDDLE LEAF',
    description: "Size: Up to 10 feet tall.\n\nWater: From spring to fall, water when the top inch of soil feels dry, more sparingly in winter.\n\nFertilize: Apply a high-nitrogen fertilizer that includes micronutrients monthly from spring through fall. Don't feed during winter months.\n\nDescription:\n   Fiddle-leaf figs instantly give any room a jungle-like vibe. They grow very slowly, but can eventually reach the ceiling. With a reputation for being finicky, this cold-sensitive rainforest native needs just the right conditions to thrive indoors. Prefers east-facing, sunny windows; unobstructed late day sun in a west- or south-facing window may burn the leaves. This evergreen tree can grow 25 to 50 feet tall in its native habitat. It produces large, 8 to 15-inch-long, dull green, thick, fiddle-shaped leaves.",
  },
   {
    id: 33,
    src: require('./assets/MONSTERA.png'),
    screen: 'PlantDetails',
    label: 'MONSTERA',
    description: "Size: 3 to 20 feet tall.\n\nWater: Deeply water every 1 to 2 weeks, or whenever the soil feels dry. Drooping leaves often mean your plant needs a drink.\n\nFertilize: Not necessary, but an occasional dose of all-purpose houseplant food during the spring and summer will encourage more vigorous growth.\n\nDescription:\n   Popular houseplants prized for their unique, holed leaves. They come in various types, sizes, and growth habits, making them versatile for indoor decor. Monsteras add a tropical touch to spaces and are suitable for different growing styles. Monstera deliciosa, commonly called Swiss Cheese Plant, is a climbing vine native to Mexico and Panama. It exhibits negative phototropism in its seedling stage, growing towards darker areas which indicates the base of a larger tree to climb. Monstera can produce edible fruit that tastes like a cross between jackfruit and pineapple, but the fruit is poisonous until completely ripe.",
  },
   {
    id: 34,
    src: require('./assets/POLKA DOT PLANT.png'),
    screen: 'PlantDetails',
    label: 'POLKA DOT PLANT',
    description: "Size: Up to 12 inches tall.\n\nWater: Keep the soil consistently moist, but not soggy. Too little water causes the leaves to wilt.\n\nFertilize: Apply a diluted liquid fertilizer every two weeks from early spring through late summer.\n\nDescription:\n   A charming little foliage plant with cheery pink speckles over deep-green leaves. In addition to pink, cultivars sporting white or red dots are also available. Pinch back the stems of too tall or leggy plants to encourage bushier growth. Native to Madagascar, other species in this genus are found in South Africa and Southeast Asia. It is a bushy plant with oval, softly downy leaves.",
  },

   {
    id: 35,
    src: require('./assets/RUBBER PLANT.png'),
    screen: 'PlantDetails',
    label: 'RUBBER PLANT',
    description: "Size: Up to 10 feet tall.\n\nWater: Keep soil evenly moist. Water when it becomes slightly dry to the touch.\n\nFertilize: Fertilize every two weeks when actively growing from spring through fall; monthly in winter.\n\nDescription:\n   Rubber plants can threaten to outgrow a room, but can be kept in check by pruning off the top at the central stem. This will encourage growth of side branches. Keeping your plant in a smaller pot will also curb its growth. The rubber plant is a broadleaf evergreen flowering tree in the Mulberry family. In the wild, it can reach up to 100 feet high. The species name 'elastica' refers to the milky sap that was historically used to produce rubber. It prefers to remain in one location and does not do well with drafts or cold temperatures.",
  },
   {
    id: 36,
    src: require('./assets/TRADESCANTIA.png'),
    screen: 'PlantDetails',
    label: 'TRADESCANTIA',
    description: "Size: 3 to 36 inches tall, 9 to 24 inches wide, can trail to 36 inches.\n\nWater: Tradescantias prefer moist soil, but avoid overwatering to prevent root rot.\n\nFertilize: Use a balanced liquid houseplant fertilizer monthly.\n\nDescription:\n   An easy-to-grow, trailing plant that is great for beginners. Perfect for use in a hanging basket or even spilling from a regular planter. If your plant becomes leggy over time, prune it back by pinching off the stems directly above a leaf node. This plant is part of a genus that includes various species known for their trailing habit. They are often grown for their colorful foliage.",
  },
   {
    id: 37,
    src: require('./assets/WATERMELON PEPEROMIA.png'),
    screen: 'PlantDetails',
    label: 'WATERMELON PEPEROMIA',
    description: "Size: 6 to 8 inches tall.\n\nWater: Water moderately, allowing the soil to become dry to the touch before rewatering. Overwatering can cause root rot.\n\nFertilize: Apply a balanced 20-20-20 liquid fertilizer monthly during the growing season, from mid-March to November. Cease fertilizing in winter when plant growth slows down.\n\nDescription:\n   Looking like a potful of mini watermelons atop red stems, this green-and-silver striped peperomia begs to be noticed. A nearly foolproof houseplant for beginners, it rarely needs repotting and doesn’t mind a bit of neglect. This peperomia is visually distinct with its green-and-silver striped leaves and red stems. It is a nearly foolproof houseplant.",
  },

];

  return (
    <ScrollView contentContainerStyle={homeStyles.scrollContent}>
      <View style={homeStyles.container}>
      
        <View style={homeStyles.gridContainer}>
          {items.map(({ id, src, screen, label, description}) => (
            <TouchableOpacity
              key={id}
              style={homeStyles.gridItem}
              onPress={() => navigation.navigate('PlantDetails', { plant: id, label, description, image: src })}
            >
              <Image source={src} style={homeStyles.image} />
              <Text style={homeStyles.label}>{label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const homeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#98B486',
  },
  scrollContent: {
    paddingBottom: 20,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between', // Ensures even spacing
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  gridItem: {
    width: '48%', // 2 columns
    marginBottom: 15,
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 8,
    padding: 10,
  },
  image: {
    width: '100%',
    height: 120,
    resizeMode: 'contain',
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

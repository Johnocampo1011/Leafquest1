import PlantStatusBar from './PlantStatusBar'; // import the shared component
import { SafeAreaView, ScrollView, View, Text, Image,StyleSheet,TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


export default function CustomHeader({ onMenuPress }) {
  return (
    <View style={styles.header}>
      <View style={{ width: 24 }} /> 
      <TouchableOpacity onPress={onMenuPress}>
        <Ionicons name="menu" size={28} color="green" />
      </TouchableOpacity>
    </View>
  );
}

export function PothosDetail({ navigation }) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <CustomHeader onMenuPress={() => navigation.navigate('Menu')} />
      <ScrollView contentContainerStyle={plntstyles.container}>
        <View style={plntstyles.headerlibrary}>
          <Text style={plntstyles.titlelibrary}>POTHOS</Text>
        </View>
        <View style={plntstyles.content}>
          <Image source={require('./assets/POTHOS.png')} style={plntstyles.plantImage} resizeMode="contain" />
        </View>

        <PlantStatusBar
          initialValues={{ water: 0.2, light: 0.6, fertilizer: 0.3 }}
        />

          <View style={plntstyles.detailSectionlibrary}>
          <Text style={plntstyles.sectionTitle}>(Epipremnum aureum)</Text>
          <Text style={plntstyles.paragraph}>
            • Botanical family: Araceae{'\n'}• Origin: Tropical rainforests
          </Text>
          <Text style={[plntstyles.paragraph, { marginTop: 20 }]}>
            <Text style={{ fontWeight: 'bold' }}>Size:</Text> Vines 6 to 10 feet long {'\n'}
            <Text style={{ fontWeight: 'bold' }}>Water</Text> Allow the top inch of soil to dry out between watering. {'\n'}
            <Text style={{ fontWeight: 'bold' }}>Fertilizer</Text> Light feeders, so use a balanced liquid fertilizer every 1 to 3 months. {'\n'}{'\n'}

            One of the easiest houseplants to grow. This tropical vine comes in a variety of foliage colors and patterns. Pothos can be trimmed and kept compact, allowed to trail from hanging baskets, or trained up vertical supports.

          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
export function PhilodenronDetail({ navigation }) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <CustomHeader onMenuPress={() => navigation.navigate('Menu')} />
      <ScrollView contentContainerStyle={plntstyles.container}>
        <View style={plntstyles.headerlibrary}>
          <Text style={plntstyles.titlelibrary}>PHILODENDRON</Text>
        </View>
        <View style={plntstyles.content}>
          <Image source={require('./assets/PHILODENDRON.png')} style={plntstyles.plantImage} resizeMode="contain" />
        </View>

        <PlantStatusBar
          initialValues={{ water: 0.3, light: 0.5, fertilizer: 0.4 }}
        />

        <View style={plntstyles.detailSectionlibrary}>
        <Text style={plntstyles.sectionTitle}>(Philodendron spp.)</Text>
        <Text style={plntstyles.paragraph}><Text style={{ fontWeight: 'bold' }}>Size:</Text> Vines to 8 feet long {'\n'}
        <Text style={{ fontWeight: 'bold' }}>Water:</Text> Prefers evenly moist soil, but not soggy. Water if top inch of soil is dry. {'\n'}
        <Text style={{ fontWeight: 'bold' }}>Fertilizer:</Text>  Apply a water-soluble houseplant fertilizer from spring through fall.</Text>
        <Text style={[plntstyles.paragraph, { marginTop: 20 }]}>Another very easy-to-grow houseplant, similar to pothos. Tolerates low light, but will grow faster in medium to bright light. Foliage comes in a variety of sizes, shapes, and colors. Philodendrons can also be grown outdoors in mild climates. 
        </Text>

      </View>
    </ScrollView>
    </SafeAreaView>
  );
}


export function PrayerPlantDetail({ navigation }) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <CustomHeader onMenuPress={() => navigation.navigate('Menu')} />
      <ScrollView contentContainerStyle={plntstyles.container}>
        <View style={plntstyles.headerlibrary}>
          <Text style={plntstyles.titlelibrary}>PRAYER PLANT</Text>
        </View>
        <View style={plntstyles.content}>
          <Image source={require('./assets/PrayerPlant.png')} style={plntstyles.plantImage} resizeMode="contain" />
        </View>

        <PlantStatusBar
          initialValues={{ water: 0.4, light: 0.5, fertilizer: 0.3 }}
        />

        <View style={plntstyles.detailSectionlibrary}>
        <Text style={plntstyles.sectionTitle}>Calathea spp.</Text>
        <Text style={plntstyles.paragraph}><Text style={{ fontWeight: 'bold' }}>Size:</Text> Up to 3 feet tall {'\n'}
            <Text style={{ fontWeight: 'bold' }}>Water:</Text> Keep evenly moist. Don't allow to become overly soggy or dry out completely. May be sensitive to tap water, so use distilled or filtered water. {'\n'}
        <Text style={{ fontWeight: 'bold' }}>Fertilizer:</Text>  Once a month from spring through fall.</Text>
        <Text style={[plntstyles.paragraph, { marginTop: 20 }]}>Also called rattlesnake plant, peacock plant, or zebra plant, this popular houseplant is grown for its decorative foliage in an assortment of patterns, colors, and shapes. Prayer plants don't like their roots disturbed, so repot in early spring only if rootbound. 
        </Text>

      </View>
    </ScrollView>
    </SafeAreaView>
  );
}


export function BirdNestFernDetail({ navigation }) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <CustomHeader onMenuPress={() => navigation.navigate('Menu')} />
      <ScrollView contentContainerStyle={plntstyles.container}>
        <View style={plntstyles.headerlibrary}>
          <Text style={plntstyles.titlelibrary}>BIRD NEST FERN</Text>
        </View>
        <View style={plntstyles.content}>
          <Image source={require('./assets/BirdNestFern.png')} style={plntstyles.plantImage} resizeMode="contain" />
        </View>

        <PlantStatusBar
          initialValues={{ water: 0.5, light: 0.6, fertilizer: 0.4 }}
        />

        <View style={plntstyles.detailSectionlibrary}>
        <Text style={plntstyles.sectionTitle}>Asplenium nidus</Text>
        <Text style={plntstyles.paragraph}><Text style={{ fontWeight: 'bold' }}>Size:</Text> Up to 2 feet tall {'\n'}
        <Text style={{ fontWeight: 'bold' }}>Water:</Text>  Keep soil evenly moist, but not soggy. Water at the edge of the rosette so water doesn't pool in the center and cause rot. Yellow leaves signal overwatering. {'\n'}
        <Text style={{ fontWeight: 'bold' }}>Fertilizer:</Text>  Fertilize every 2 to 4 weeks from spring until fall with a diluted houseplant fertililzer. </Text>
        <Text style={[plntstyles.paragraph, { marginTop: 20 }]}>Also called rattlesnake plant, peacock plant, or zebra plant, this popular houseplant is grown for its decorative foliage in an assortment of patterns, colors, and shapes. Prayer plants don't like their roots disturbed, so repot in early spring only if rootbound. 
        </Text>

      </View>
    </ScrollView>
    </SafeAreaView>
  );
}


export function ZzPlantDetail({ navigation }) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <CustomHeader onMenuPress={() => navigation.navigate('Menu')} />
      <ScrollView contentContainerStyle={plntstyles.container}>
        <View style={plntstyles.headerlibrary}>
          <Text style={plntstyles.titlelibrary}>ZZ PLANT</Text>
        </View>
        <View style={plntstyles.content}>
          <Image source={require('./assets/ZzPlant.png')} style={plntstyles.plantImage} resizeMode="contain" />
        </View>

        <PlantStatusBar
          initialValues={{ water: 0.2, light: 0.5, fertilizer: 0.3 }}
        />

        <View style={plntstyles.detailSectionlibrary}>
        <Text style={plntstyles.sectionTitle}>Zamioculcas zamiifolia</Text>
        <Text style={plntstyles.paragraph}><Text style={{ fontWeight: 'bold' }}>Size:</Text>  2 to 3 feet tall {'\n'}
        <Text style={{ fontWeight: 'bold' }}>Water:</Text>  ZZ plants store water in their semi-succulent stems so you may only need to water every couple weeks. Overwatering can do more damage than underwatering, so don't allow the soil to become soggy. {'\n'}
        <Text style={{ fontWeight: 'bold' }}>Fertilizer:</Text>  They are light feeders, so only fertilize every three months or so. </Text>
        <Text style={[plntstyles.paragraph, { marginTop: 20 }]}>The naturally shiny leaves of the ZZ plant require little effort to maintain their good looks. Simply dust them off with a damp cloth (leaf sprays may damage the foliage). ZZ plants also do well in medium/bright, indirect light. Keep in mind that all parts of the plant are toxic, so keep away from children and pets.  
        </Text>
      
      </View>
    </ScrollView>
    </SafeAreaView>
  );
}




const styles = StyleSheet.create({
  header: {
    height: 40,
    backgroundColor: 'fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginTop: 40,
  },
});


const plntstyles = StyleSheet.create({ 

container: { backgroundColor: '#fff', padding: 20, }, 
headerlibrary: { alignItems: 'center', marginBottom: 20, marginTop: 15, }, 
titlelibrary: { fontSize: 34, fontWeight: 'bold', color: '#333', }, 
content: { alignItems: 'center', marginBottom: 30, }, 
plantImage: { width: '80%', height: 240, resizeMode: 'contain', }, 
circlesRow: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 30, }, 
circleButton: { width: 60, height: 60, borderRadius: 30, borderWidth: 2, borderColor: '#3a7d44', alignItems: 'center', justifyContent: 'center', position: 'relative', }, 
badge: { position: 'absolute', top: -6, right: -6, backgroundColor: '#fff', borderRadius: 10, paddingHorizontal: 4, paddingVertical: 2, borderWidth: 1, borderColor: 'black', }, 
badgeText: { fontSize: 12, color: '#3a7d44', fontWeight: 'bold', }, 
detailSectionlibrary: { paddingBottom: 40, }, 
sectionTitle: { fontSize: 20, fontWeight: '600', marginBottom: 20, textAlign: 'center',  }, 
paragraph: { fontSize: 15, lineHeight: 20, color: '#555', textAlign: 'justify',marginHorizontal:15 },
});
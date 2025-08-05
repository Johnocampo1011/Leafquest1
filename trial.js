export function PlantDetailScreen() {
  const onCirclePress = (type) => console.log(type, 'pressed');

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Plant Name</Text>
        <Ionicons name="ellipsis-vertical" size={24} />
      </View>

      <View style={styles.content}>
        {/* Vertical status bar */}
        <View style={styles.statusBarContainer}>
          <View style={styles.statusFill} />
          <View style={styles.statusBackground} />
        </View>

        {/* Plant image */}
        <Image
          source={require('./assets/image.png')}
          style={styles.plantImage}
          resizeMode="contain"
        />
      </View>

      {/* Circle‑buttons row */}
      <View style={styles.circlesRow}>
        {[
          { icon: 'water', count: 12, type: 'water' },
          { icon: 'sunny', count: 8, type: 'light' },
          { icon: 'leaf', count: 3, type: 'fertilizer' },
        ].map(({ icon, count, type }) => (
          <TouchableOpacity
            key={type}
            style={styles.circleButton}
            onPress={() => onCirclePress(type)}
          >
            <Ionicons name={icon} size={24} color="#3a7d44" />
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{count}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Detailed info below */}
      <View style={styles.detailSection}>
        <Text style={styles.sectionTitle}>Full Details</Text>
        <Text style={styles.paragraph}>
          • Botanical family: Araceae{'\n'}
          • Origin: Tropical rainforests{'\n'}
          • Optimal temp: 65–85°F (18–29°C){'\n'}
          • Humidity: High (60–80%){'\n\n'}
          Care instructions:{'\n'}
          – Water when top 2″ of soil is dry.{'\n'}
          – Bright, indirect light only.{'\n'}
          – Feed monthly during growing season.
        </Text>
        {/* you can add more subsections here */}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  statusBarContainer: {
    width: 10,
    height: 200,
    borderRadius: 5,
    backgroundColor: '#e0e0e0',
    marginRight: 12,
    overflow: 'hidden',
  },
  statusFill: {
    flex: 0.6,              // 60% filled
    backgroundColor: '#7bbf6a',
  },
  statusBackground: {
    flex: 0.4,
  },
  plantImage: {
    flex: 1,
    height: 200,
  },
  circlesRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 24,
  },
  circleButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#3a7d44',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -6,
    right: -6,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderWidth: 1,
    borderColor: '#3a7d44',
  },
  badgeText: {
    fontSize: 12,
    color: '#3a7d44',
    fontWeight: 'bold',
  },
  detailSection: {
    paddingBottom: 40,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
  },
  paragraph: {
    fontSize: 14,
    lineHeight: 20,
    color: '#555',
  },
});



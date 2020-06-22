import { StyleSheet, Dimensions } from 'react-native'
import COLOR from './Colors'

const WINDOW_WIDTH = Dimensions.get('window').width
const MAX_CARD_WIDTH = WINDOW_WIDTH - 20

const css = StyleSheet.create({

	//TEXTINPUT
	textInputStyle: { textAlign: "center", justifyContent: 'center', width: 250, fontSize: 20 },

	//CARD
	card_container: { backgroundColor: COLOR.WHITE, width: MAX_CARD_WIDTH, borderTopLeftRadius: 20, borderTopRightRadius: 20, borderBottomLeftRadius: 20, borderBottomRightRadius: 20 },

	//CARD HEADER
	ch_headerContainer: { flexDirection: 'row', borderWidth: 3, borderColor: COLOR.GREY, borderBottomColor: COLOR.GREY, backgroundColor: COLOR.PRIMARY, borderTopLeftRadius: 20, borderTopRightRadius: 20, width: 300 },
	ch_titleText: { flexGrow: 1, fontSize: 18, color: COLOR.WHITE, paddingLeft: 20, paddingRight: 20, paddingVertical: 10, textAlign: 'center', justifyContent: 'center'},

	//CARD BODY
	cb_bodyContainer: { backgroundColor: COLOR.WHITE, borderBottomLeftRadius: 20, borderBottomRightRadius: 20, alignItems: 'center', borderBottomWidth: 3, borderRightWidth: 3, borderLeftWidth: 3, borderColor: COLOR.GREY, marginBottom: 50 },
	cb_textStyle: { color: COLOR.RED, marginLeft: 30, marginRight: 30, fontSize: 18, paddingLeft: 10, textAlign: "center", justifyContent: 'center' },

	lottie: { width: 300, height: 300 }
})

module.exports = css
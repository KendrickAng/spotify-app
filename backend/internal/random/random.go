package random

import (
	"math/rand"
	"time"
)

const LettersLower = "abcdefghijklmnopqrstuvwxyz"
const LettersUpper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
var Letters = LettersLower + LettersUpper


func RandomAlphabet() string {
	r := rand.New(rand.NewSource(time.Now().UnixNano()))
	return string(Letters[r.Intn(len(Letters))])
}

func RandomInt(aInc int, bInc int) int {
	r := rand.New(rand.NewSource(time.Now().UnixNano()))
	// shift the range to [0, n) to use with Intn, then add back the offset
	return r.Intn(bInc - aInc) + aInc
}

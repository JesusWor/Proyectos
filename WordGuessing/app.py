import random

word_bank = ['rizz', 'ohio', 'sigma', 'tiktok', 'skibidi']
word = random.choice(word_bank)

guessedWord = ['_'] * len(word)

attempts = 5

while attempts > 0 and '_' in guessedWord:
    print('\nCurrent word: '+ ' '.join(guessedWord))
    guess = input('guess a letter: ')
    if guess in word:
        for i in range(len(word)):
            if word[i] == guess:
                guessedWord[i] = guess
        print('Great guess!')
    else:
        attempts -= 1
        print('Esa letra no existe en la palabra, intentos restantes: '+str(attempts))
if '_' not in guessedWord:
    print('Felicidades adivinaste la palabra: ' + word)
else:
    print('Lo siento, no adivinaste la palabra. La palabra era: '+ word)
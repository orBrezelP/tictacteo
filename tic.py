import pygame

# Initialize Pygame
pygame.init()

# Set up the game window
WINDOW_WIDTH = 300
WINDOW_HEIGHT = 300
window = pygame.display.set_mode((WINDOW_WIDTH, WINDOW_HEIGHT))
pygame.display.set_caption("Erasing Tic-Tac-Toe")

# Define colors
BLACK = (0, 0, 0)
WHITE = (255, 255, 255)
RED = (255, 0, 0)
BLUE = (0, 0, 255)

# Define game board and player symbols
board = [[None, None, None],
         [None, None, None],
         [None, None, None]]
player = "X"
erase_move = 0

# Define cell size and margin
CELL_SIZE = WINDOW_WIDTH // 3
MARGIN = 5

# Function to draw the game board
def draw_board():
    window.fill(WHITE)
    for row in range(3):
        for col in range(3):
            value = board[row][col]
            rect = pygame.Rect(col * CELL_SIZE + MARGIN, row * CELL_SIZE + MARGIN, CELL_SIZE - 2 * MARGIN, CELL_SIZE - 2 * MARGIN)
            pygame.draw.rect(window, BLACK, rect, 1)
            if value is not None:
                font = pygame.font.Font(None, 80)
                text = font.render(value, True, BLACK)
                text_rect = text.get_rect(center=rect.center)
                window.blit(text, text_rect)
    pygame.display.update()

# Function to handle player move
def handle_move(row, col):
    global player, erase_move
    if board[row][col] is None:
        board[row][col] = player
        if erase_move < 3:
            erase_move += 1
        else:
            erase_row, erase_col = erase_move - 3, 0
            board[erase_row][erase_col] = None
            erase_move += 1
        player = "O" if player == "X" else "X"

# Function to check for a winner
def check_winner():
    for row in range(3):
        if board[row][0] == board[row][1] == board[row][2] != None:
            return board[row][0]
    for col in range(3):
        if board[0][col] == board[1][col] == board[2][col] != None:
            return board[0][col]
    if board[0][0] == board[1][1] == board[2][2] != None:
        return board[0][0]
    if board[0][2] == board[1][1] == board[2][0] != None:
        return board[0][2]
    return None

# Game loop
running = True
while running:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False
        elif event.type == pygame.MOUSEBUTTONDOWN:
            row = event.pos[1] // CELL_SIZE
            col = event.pos[0] // CELL_SIZE
            handle_move(row, col)
            draw_board()
            winner = check_winner()
            if winner:
                font = pygame.font.Font(None, 36)
                text = font.render(f"{winner} wins!", True, RED)
                text_rect = text.get_rect(center=(WINDOW_WIDTH // 2, WINDOW_HEIGHT // 2))
                window.blit(text, text_rect)
                pygame.display.update()
                pygame.time.wait(2000)
                board = [[None, None, None],
                         [None, None, None],
                         [None, None, None]]
                player = "X"
                erase_move = 0
                draw_board()

# Quit Pygame
pygame.quit()

import glob

pattern = '/Users/matthewfritz/LL AI/typingSpeedTest/**/*.mp3'

file_paths = glob.glob(pattern, recursive=True)

for file_path in file_paths:
    print(f'File found: {file_path}')
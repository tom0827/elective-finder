# Get the current branch name
BRANCH=$(git rev-parse --abbrev-ref HEAD)

# Allow only 'main' and 'develop' branches
if [[ "$BRANCH" != "main" && "$BRANCH" != "develop" ]]; then
    echo "Skipping build for branch $BRANCH"
    exit 1  # Non-zero exit code will stop the build
fi

echo "Building for branch $BRANCH"

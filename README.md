# android-get-app-version-action

A Github Action to get the android app versionCode and versionName from AndroidManifest file, additionally it returns next versionCode.

### Usage

```Dockerfile
name: Bump version
on:
  push:
    branches:
      - master
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
      with:
        fetch-depth: '0'
    
    - name: Bump version and push tag
      id: get_version
      uses: eriknyk/android-get-app-version-action@v1.0.0
    
    - name: Create Release (Other action that uses app versionCode & versionName)
      id: create_release
      uses: actions/create-release@v1
      env:
        GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
      with:
        tag_name: '${{ steps.get_version.outputs.versionName }}-${{ steps.get_version.outputs.nextVersionCode }}'
        release_name: 'Release ${{ steps.get_version.outputs.versionName }}-${{ steps.get_version.outputs.nextVersionCode }}'
        draft: false
        prerelease: false
```

## Outputs

### `versionName`

The **versionName** value from AndroidManifest.xml

### `versionCode` 
  
The **versionCode** value from AndroidManifest.xml

###  `nextVersionCode`
    
The **Next versionCode** value, since it is an integer value it will contains the respective `versionCode + 1`  value.

# React Native Image Resizer

A React Native module that can create scaled versions of local images (also supports the assets library on iOS).

## Setup

First, install the package:
```
npm install react-native-image-resizer --save
```

### Automatic installation (iOS and Android)

Use [rnpm](https://github.com/rnpm/rnpm):

```
npm install rnpm -g
rnpm link
```

### Manual installation for iOS

You need to add `RNImageResizer.xcodeproj` to **Libraries** and add `libRNImageResizer.a` to **Link Binary With Libraries** under **Build Phases**. [More info and screenshots about how to do this is available in the React Native documentation](http://facebook.github.io/react-native/docs/linking-libraries-ios.html#content).

### Manual installation for Android

#### Update your gradle files

For **react-native >= v0.15**, this command will do it automatically:
```
react-native link react-native-image-resizer
```

For **react-native = v0.14**
You will have to update them manually:

In `android/settings.gradle`, add:
```
include ':react-native-image-resizer'
project(':react-native-image-resizer').projectDir = new File(settingsDir, '../node_modules/react-native-image-resizer/android')
```

In `android/app/build.gradle` add:
```
dependencies {
  ...
  compile project(':react-native-image-resizer')
}
```

#### Register the package into your `MainActivity`
```java
package com.example;

import android.app.Activity;
import android.os.Bundle;
import android.view.KeyEvent;

import com.facebook.react.LifecycleState;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactRootView;
import com.facebook.react.modules.core.DefaultHardwareBackBtnHandler;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

// IMPORT HERE
import fr.bamlab.rnimageresizer.ImageResizerPackage;
// ---

public class MainActivity extends Activity implements DefaultHardwareBackBtnHandler {

    private ReactInstanceManager mReactInstanceManager;
    private ReactRootView mReactRootView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        mReactRootView = new ReactRootView(this);

        mReactInstanceManager = ReactInstanceManager.builder()
                .setApplication(getApplication())
                .setBundleAssetName("index.android.bundle")
                .setJSMainModuleName("index.android")
                .addPackage(new MainReactPackage())

                // REGISTER PACKAGE HERE
                .addPackage(new ImageResizerPackage())
                // ---
                .setUseDeveloperSupport(BuildConfig.DEBUG)
                .setInitialLifecycleState(LifecycleState.RESUMED)
                .build();

        mReactRootView.startReactApplication(mReactInstanceManager, "example", null);

        setContentView(mReactRootView);
    }

    ...
```

## Usage example

```javascript
import ImageResizer from 'react-native-image-resizer';

ImageResizer.createResizedImage(imageUri, newWidth, newHeight, compressFormat, quality, rotation, outputPath).then((resizedImageUri) => {
  // resizeImageUri is the URI of the new image that can now be displayed, uploaded...
}).catch((err) => {
  // Oops, something went wrong. Check that the filename is correct and
  // inspect err to get more details.
});
```

### Sample app

A basic, sample app is available in [the `example` folder](https://github.com/bamlab/react-native-image-resizer/tree/master/example). It uses the module to resize a photo from the Camera Roll.

## API

### `promise createResizedImage(path, maxWidth, maxHeight, compressFormat, quality, rotation = 0, outputPath)`

The promise resolves with a string containing the uri of the new file.

Option | Description
------ | -----------
path | Path of image
maxWidth | Image max width (ratio is preserved)
maxHeight | Image max height (ratio is preserved)
compressFormat | Can be either JPEG, PNG (android only) or WEBP (android only).
quality | A number between 0 and 100. Used for the JPEG compression.
rotation | Rotation to apply to the image, in degrees, for android only. On iOS, the resizing is done such that the orientation is always up.
outputPath | The resized image path. If null, resized image will be stored in cache folder. To set outputPath make sure to add option for rotation too (if no rotation is needed, just set it to 0).

## Other open-source modules by the folks at [BAM](http://github.com/bamlab)

 * [rn-camera-roll](https://github.com/bamlab/rn-camera-roll)
 * [react-native-animated-picker](https://github.com/bamlab/react-native-animated-picker)
 * [cordova-plugin-native-routing](https://github.com/bamlab/cordova-plugin-native-routing)

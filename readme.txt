Run the app:
	npx expo start

Types of builds in Expo

[1] Development build (App will be uploaded to expo.dev, then it can be run using npx expo start)

Runs your native code, but still connects to Metro (npx expo start).
Lets you live reload changes.
This is why when you changed code, it updated on your phone.
Command looked like:

eas build -p android --profile development

Or sometimes:

npx expo run:android

✅ Great for testing custom native code with live reload.
❌ Not standalone (needs expo start).

[2] Preview/Production build (Standalone APK/AAB: This creates an actual APK file which can be shared to anyone)

Entire app is bundled inside, no Metro needed.
Once built, changes to your code won’t show up until you build again.
Command:

eas build -p android --profile preview


🔑 So:

The one you remember (dependent on expo start) was a development build.
The one you’re doing now (--profile preview) is a standalone build, no Metro required.

To create Play Store Production Version (AAB file):

eas build -p android --profile production

To create App Store Production Version (IPA file):

eas build -p ios --profile production
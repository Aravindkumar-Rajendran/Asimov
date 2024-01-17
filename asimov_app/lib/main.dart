import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  runApp(
    MaterialApp(
      title: 'Asimov - Demo',
      // Start the app with the "/" named route. In this case, the app starts
      // on the FirstScreen widget.
      initialRoute: '/',
      routes: {
        // When navigating to the "/" route, build the FirstScreen widget.
        '/': (context) => const HomePage(),
        '/vocab': (context) => const VocabScreen(),
        '/grammar': (context) => const GrammarScreen(),
        '/dialogue': (context) => const DialogueScreen(),
        '/freeflow': (context) => const FreeFlowScreen(),
      },
      theme: ThemeData(
          useMaterial3: true,
          // Define the default brightness and colors.
          colorScheme: ColorScheme.fromSeed(
            seedColor: Colors.blue,
            brightness: Brightness.light,
          ),

          // Define the default `TextTheme`. Use this to specify the default
          // text styling for headlines, titles, bodies of text, and more.
          textTheme: TextTheme(
            displayLarge: const TextStyle(
              fontSize: 72,
              fontWeight: FontWeight.bold,
            ),
            titleLarge: GoogleFonts.openSans(
              fontSize: 30,
              fontStyle: FontStyle.normal,
            ),
            titleMedium: GoogleFonts.openSans(
              fontSize: 30,
              fontWeight: FontWeight.bold,
              color: Colors.blue,
            ),
            titleSmall: GoogleFonts.openSans(
              fontSize: 24,
              fontWeight: FontWeight.bold,
              color: Colors.blue,
            ),
            bodyMedium: GoogleFonts.openSans(),
            displaySmall: GoogleFonts.openSans(),
          ),
        ),
    ),
  );
}

class HomePage extends StatelessWidget {
  const HomePage({super.key});
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Asimov'),
      ),
      body: Column(
        children: [
          Container(
            width: double.infinity,
            padding: const EdgeInsets.all(20.0),
            margin: const EdgeInsets.all(10.0),
            decoration: const BoxDecoration(
              color: Colors.lightBlue,
              // shape: BoxShape.circle,
              borderRadius: BorderRadius.all(Radius.circular(10))
            ), 
            child:  Center(
              child: Text(
                  "\nHi Aravind\n",
                  style: Theme.of(context).textTheme.titleMedium!.copyWith(
                        color: Theme.of(context).colorScheme.onPrimary,
                      ),
                ),
            ),
            ),
          const SizedBox(height: 100.0,),
          Center(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                ElevatedButton(
                  onPressed: () {
                    Navigator.pushNamed(context, '/vocab');
                  },
                  style: ElevatedButton.styleFrom(
                    minimumSize: const Size(350, 50),
                    backgroundColor: Colors.white,
                    shape: const RoundedRectangleBorder(
                      borderRadius: BorderRadius.all(Radius.circular(10))
                    )
                  ),
                  child: Text('Random Vocabulary',
                    style: Theme.of(context).textTheme.titleSmall,
                    selectionColor: Colors.blue,
                  )
                ),
                const SizedBox(height: 20.0,),
                ElevatedButton(
                  // Within the `HomePage` widget
                  onPressed: () {
                    // Navigate to the second screen using a named route.
                    Navigator.pushNamed(context, '/grammar');
                  },
                  style: ElevatedButton.styleFrom(
                    minimumSize: const Size(350, 50),
                    backgroundColor: Colors.white,
                    shape: const RoundedRectangleBorder(
                      borderRadius: BorderRadius.all(Radius.circular(10))
                    )
                  ),
                  child: Text('Grammar Builder',
                    style: Theme.of(context).textTheme.titleSmall,
                    selectionColor: Colors.blue,),
                ),
                const SizedBox(height: 20.0,),
                ElevatedButton(
                  // Within the `HomePage` widget
                  onPressed: () {
                    // Navigate to the second screen using a named route.
                    Navigator.pushNamed(context, '/dialogue');
                  },
                  style: ElevatedButton.styleFrom(
                    minimumSize: const Size(350, 50),
                    backgroundColor: Colors.white,
                    shape: const RoundedRectangleBorder(
                      borderRadius: BorderRadius.all(Radius.circular(10))
                    )
                  ),
                  child: Text('Dialogue conversations',
                    style: Theme.of(context).textTheme.titleSmall,
                    selectionColor: Colors.blue,
                    ),
                ),
                const SizedBox(height: 20.0,),
                ElevatedButton(
                  // Within the `HomePage` widget
                  onPressed: () {
                    // Navigate to the second screen using a named route.
                    Navigator.pushNamed(context, '/freeflow');
                  },
                  style: ElevatedButton.styleFrom(
                    minimumSize: const Size(350, 50),
                    backgroundColor: Colors.white,
                    shape: const RoundedRectangleBorder(
                      borderRadius: BorderRadius.all(Radius.circular(10))
                    )
                  ),
                  child: Text('Free flow conversations',
                    style: Theme.of(context).textTheme.titleSmall,
                    selectionColor: Colors.blue,),
                ),
              ],
            ),
          ),
        ]
      ),
    );
  }
}

class VocabScreen extends StatelessWidget {
  const VocabScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Vocabulary Builder'),
      ),
      body: Center(
        child: ElevatedButton(
          // Within the VocabScreen widget
          onPressed: () {
            // Navigate back to the first screen by popping the current route
            // off the stack.
            Navigator.pop(context);
          },
          child: const Text('Go back!'),
        ),
      ),
    );
  }
}


class GrammarScreen extends StatelessWidget {
  const GrammarScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Grammar Builder'),
      ),
      body: Center(
        child: ElevatedButton(
          // Within the GrammarScreen widget
          onPressed: () {
            // Navigate back to the first screen by popping the current route
            // off the stack.
            Navigator.pop(context);
          },
          child: const Text('Go back!'),
        ),
      ),
    );
  }
}

class DialogueScreen extends StatelessWidget {
  const DialogueScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Dialogues practice'),
      ),
      body: Center(
        child: ElevatedButton(
          // Within the DialogueScreen widget
          onPressed: () {
            // Navigate back to the first screen by popping the current route
            // off the stack.
            Navigator.pop(context);
          },
          child: const Text('Go back!'),
        ),
      ),
    );
  }
}


class FreeFlowScreen extends StatelessWidget {
  const FreeFlowScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Free Flow conversations'),
      ),
      body: Center(
        child: ElevatedButton(
          // Within the FreeFlowScreen widget
          onPressed: () {
            // Navigate back to the first screen by popping the current route
            // off the stack.
            Navigator.pop(context);
          },
          child: const Text('Go back!'),
        ),
      ),
    );
  }
}
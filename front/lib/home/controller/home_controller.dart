import 'dart:developer';

import 'package:http/http.dart' as http;
import 'package:flutter/material.dart';

class HomeController {
  HomeController();

  Future<void> calcular({
    required String nSmall,
    required String nBig,
    required DateTime date,
  }) async {
    if (int.parse(nSmall) + int.parse(nBig) < 1) {
      resultText.value = 'Adicione ao menos um cão!';
      return;
    }

    loading.value = true;
    try {
      final response = await http.post(
        Uri.parse(
          'http://localhost:5086/api/Values?data=${date.toIso8601String()}&caesPequenos=$nSmall&caesGrandes=$nBig',
        ),
      );
      resultText.value = response.body;
    } catch (e, s) {
      log('ERRO na chamada', error: e, stackTrace: s);
      resultText.value = 'Erro na chamada. Tente novamente';

      return;
    } finally {
      loading.value = false;
    }
  }

  final loading = ValueNotifier<bool>(false);
  final resultText = ValueNotifier<String>('Onde vamos hoje?');
}

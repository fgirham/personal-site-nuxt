<script setup lang="ts">
import ascensionClimbData from "./ascension-climb.json";
</script>

<template>
  <PageContainer class="sts2-page">
    <div class="space-y-12">
      <!-- Header -->
      <div>
        <h1 class="text-2xl font-bold">SLAY THE SPIRE 2</h1>
        <p class="text-lg text-muted-foreground">
          Ascension Climb Win Rate Analysis
        </p>
        <p class="text-sm text-muted-foreground">
          Analysis Date: {{ ascensionClimbData.analysisDate }} • {{ ascensionClimbData.runsAnalyzed }} runs
          analyzed
        </p>
      </div>

      <!-- Overall Win Rate -->
      <div>
        <STS2StatDisplay
          :value="ascensionClimbData.overall.winRate"
          label="Overall Win Rate"
          suffix="%"
        />
      </div>

      <!-- Character Performance -->
      <STS2CharacterPerformance
        :data="ascensionClimbData.byCharacter"
        :characters="ascensionClimbData.characters"
      />

      <!-- Ascension Difficulty -->
      <STS2AscensionChart :data="ascensionClimbData.byAscension" />

      <!-- Character Breakdown -->
      <STS2CharacterBreakdown
        :data="ascensionClimbData.byCharacterAndAscension"
        :characters="ascensionClimbData.characters"
      />
    </div>
  </PageContainer>
</template>
